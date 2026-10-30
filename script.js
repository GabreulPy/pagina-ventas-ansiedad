// Interactividad de la Página de Ventas — Anti-ansiedad ("Cálmate, mente.")
document.addEventListener('DOMContentLoaded', function () {

    // 1. Pestañas de la Demo Interactiva (Teléfono en el Hero)
    var mockTabs = document.querySelectorAll('.mock-tab');
    var mockPanes = document.querySelectorAll('.mock-pane');

    mockTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.getAttribute('data-mocktab');
            mockTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');

            mockPanes.forEach(function (p) { p.classList.remove('active'); });
            var activePane = document.getElementById('mock-pane-' + target);
            if (activePane) activePane.classList.add('active');
        });
    });

    // 2. Simulación en vivo del Círculo de Respiración 4-2-6
    var circle = document.getElementById('demoBreathCircle');
    var timerEl = document.getElementById('demoBreathTimer');
    var textEl = document.getElementById('demoBreathText');
    var subEl = document.getElementById('demoBreathSub');
    var breathInterval = null;

    function runDemoBreathing(phase) {
        if (!circle || !timerEl) return;
        if (breathInterval) clearInterval(breathInterval);

        var seconds = 4;
        if (phase === 'inhale') {
            seconds = 4;
            textEl.textContent = 'Inhala suave por la nariz...';
            subEl.textContent = 'Lleva el aire hacia tu abdomen (4s)';
            circle.style.transition = 'transform 4s ease-in-out, box-shadow 4s ease';
            circle.style.transform = 'scale(1.38)';
            circle.style.boxShadow = '0 0 42px rgba(80, 200, 120, 0.6)';
        } else if (phase === 'hold') {
            seconds = 2;
            textEl.textContent = 'Sostén el aire con calma...';
            subEl.textContent = 'Nota la quietud interior (2s)';
            circle.style.transition = 'transform 0.3s ease';
        } else if (phase === 'exhale') {
            seconds = 6;
            textEl.textContent = 'Exhala despacio por la boca...';
            subEl.textContent = 'Suelta los hombros y la tensión (6s)';
            circle.style.transition = 'transform 6s ease-in-out, box-shadow 6s ease';
            circle.style.transform = 'scale(1.0)';
            circle.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.28)';
        }

        var rem = seconds;
        timerEl.textContent = rem;
        breathInterval = setInterval(function () {
            rem--;
            if (rem > 0) timerEl.textContent = rem;
        }, 1000);

        setTimeout(function () {
            if (phase === 'inhale') runDemoBreathing('hold');
            else if (phase === 'hold') runDemoBreathing('exhale');
            else runDemoBreathing('inhale');
        }, seconds * 1000);
    }

    runDemoBreathing('inhale');

    // 3. Demo Interactiva del Anclaje 5-4-3-2-1
    var groundSteps = [
        { badge: 'Paso 1 de 5', icon: '👁️', title: '5 cosas que puedas VER', desc: 'Mira a tu alrededor despacio y nombra mentalmente 5 objetos cercanos (su color, su forma, su luz).', btn: 'Ya las identifiqué →' },
        { badge: 'Paso 2 de 5', icon: '✋', title: '4 cosas que puedas TOCAR', desc: 'Siente 4 texturas a tu alcance: la tela de tu ropa, la temperatura de tus manos o el apoyo de tus pies.', btn: 'Siguiente paso →' },
        { badge: 'Paso 3 de 5', icon: '👂', title: '3 sonidos que puedas OÍR', desc: 'Escucha con atención 3 sonidos del ambiente o activa los sonidos relajantes de la aplicación.', btn: 'Siguiente paso →' },
        { badge: 'Paso 4 de 5', icon: '🌿', title: '2 aromas que puedas OLER', desc: 'Inhala suave e identifica 2 aromas en el aire o recuerda tus 2 olores favoritos (café, lluvia, mar).', btn: 'Último paso →' },
        { badge: 'Paso 5 de 5', icon: '💚', title: '1 pensamiento de AUTOCOMPASIÓN', desc: 'Pon una mano en tu pecho y dite: "Estoy aquí, estoy a salvo en el presente y esta sensación pasará".', btn: '✨ Reiniciar demostración' }
    ];
    var grIdx = 0;
    var grBtn = document.getElementById('demoGroundNext');
    if (grBtn) {
        grBtn.addEventListener('click', function () {
            grIdx = (grIdx + 1) % groundSteps.length;
            var s = groundSteps[grIdx];
            document.getElementById('demoGroundBadge').textContent = s.badge;
            document.getElementById('demoGroundIcon').textContent = s.icon;
            document.getElementById('demoGroundTitle').textContent = s.title;
            document.getElementById('demoGroundDesc').textContent = s.desc;
            grBtn.textContent = s.btn;
        });
    }

    // 4. Demo Interactiva del Diario de Desahogo
    var releaseBtn = document.getElementById('demoJournalRelease');
    var journalBox = document.getElementById('demoJournalBox');
    var journalInput = document.getElementById('demoJournalInput');
    var journalFeedback = document.getElementById('demoJournalFeedback');

    if (releaseBtn && journalBox) {
        releaseBtn.addEventListener('click', function () {
            if (!journalInput.value.trim()) {
                journalInput.value = 'Tengo miedo de no poder controlar mis pensamientos hoy...';
            }
            journalBox.classList.add('releasing');
            setTimeout(function () {
                journalInput.value = '';
                journalBox.classList.remove('releasing');
                journalFeedback.textContent = '✨ Pensamiento liberado. Así funciona dentro de la app.';
            }, 650);
        });
    }

    // 5. Acordeón de Preguntas Frecuentes (FAQ)
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq-question');
        var ans = item.querySelector('.faq-answer');
        if (!btn || !ans) return;

        btn.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');
            faqItems.forEach(function (other) {
                other.classList.remove('open');
                var otherAns = other.querySelector('.faq-answer');
                if (otherAns) otherAns.style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });

    // Abrir la primera pregunta frecuente por defecto
    if (faqItems.length > 0) {
        var firstBtn = faqItems[0].querySelector('.faq-question');
        if (firstBtn) firstBtn.click();
    }

    // 6. Sistema de Precio Local según Ubicación + Precio en USD Siempre Visible ($17.00 USD / Oferta Salida $11.90 USD)
    var BASE_USD = 17;
    var EXIT_USD = 11.90;
    var OLD_USD = 37;
    var MAIN_CHECKOUT_URL = 'https://pay.hotmart.com/S108269721W';
    var EXIT_CHECKOUT_URL = 'https://pay.hotmart.com/S108269721W?off=yylv3412';
    var isExitDiscountActiveOnPage = false;

    var countryCatalog = {
        USD: { name: 'Estados Unidos / Internacional', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 1, decimals: 2, locale: 'en-US' },
        PY:  { name: 'Paraguay', flag: '🇵🇾', currency: 'PYG', symbol: 'Gs. ', rate: 7850, decimals: 0, locale: 'es-PY', roundTo: 500 },
        AR:  { name: 'Argentina', flag: '🇦🇷', currency: 'ARS', symbol: '$', rate: 1180, decimals: 0, locale: 'es-AR', roundTo: 100 },
        MX:  { name: 'México', flag: '🇲🇽', currency: 'MXN', symbol: '$', rate: 19.8, decimals: 0, locale: 'es-MX', roundTo: 1 },
        CO:  { name: 'Colombia', flag: '🇨🇴', currency: 'COP', symbol: '$', rate: 4250, decimals: 0, locale: 'es-CO', roundTo: 100 },
        CL:  { name: 'Chile', flag: '🇨🇱', currency: 'CLP', symbol: '$', rate: 960, decimals: 0, locale: 'es-CL', roundTo: 10 },
        PE:  { name: 'Perú', flag: '🇵🇪', currency: 'PEN', symbol: 'S/ ', rate: 3.75, decimals: 2, locale: 'es-PE' },
        ES:  { name: 'España / Europa', flag: '🇪🇸', currency: 'EUR', symbol: '€', rate: 0.92, decimals: 2, locale: 'es-ES' },
        UY:  { name: 'Uruguay', flag: '🇺🇾', currency: 'UYU', symbol: '$U ', rate: 41.5, decimals: 0, locale: 'es-UY', roundTo: 5 },
        BO:  { name: 'Bolivia', flag: '🇧🇴', currency: 'BOB', symbol: 'Bs. ', rate: 6.91, decimals: 2, locale: 'es-BO' },
        CR:  { name: 'Costa Rica', flag: '🇨🇷', currency: 'CRC', symbol: '₡', rate: 515, decimals: 0, locale: 'es-CR', roundTo: 10 },
        DO:  { name: 'Rep. Dominicana', flag: '🇩🇴', currency: 'DOP', symbol: 'RD$ ', rate: 60.2, decimals: 0, locale: 'es-DO', roundTo: 5 },
        GT:  { name: 'Guatemala', flag: '🇬🇹', currency: 'GTQ', symbol: 'Q', rate: 7.75, decimals: 2, locale: 'es-GT' },
        BR:  { name: 'Brasil', flag: '🇧🇷', currency: 'BRL', symbol: 'R$ ', rate: 5.75, decimals: 2, locale: 'pt-BR' },
        EC:  { name: 'Ecuador', flag: '🇪🇨', currency: 'USD', symbol: '$', rate: 1, decimals: 2, locale: 'es-EC' },
        PA:  { name: 'Panamá', flag: '🇵🇦', currency: 'USD', symbol: '$', rate: 1, decimals: 2, locale: 'es-PA' },
        SV:  { name: 'El Salvador', flag: '🇸🇻', currency: 'USD', symbol: '$', rate: 1, decimals: 2, locale: 'es-SV' }
    };

    var euroCountries = ['ES', 'DE', 'FR', 'IT', 'PT', 'NL', 'BE', 'AT', 'IE', 'FI', 'GR'];

    var selectEl = document.getElementById('countryCurrencySelect');
    var locLabelEl = document.getElementById('detectedLocationLabel');
    var currencyCodeEl = document.getElementById('localCurrencyCode');
    var offerPriceEl = document.getElementById('offerPrice');
    var oldPriceEl = document.getElementById('oldPriceDisplay');
    var usdBadgeEl = document.getElementById('usdAlwaysBadge');
    var checkoutBtnEl = document.getElementById('mainCheckoutBtn');
    var checkoutBtnTextEl = document.getElementById('checkoutBtnText');
    var mobileStickyPriceEl = document.getElementById('mobileStickyPrice');

    // Elementos del Modal de Intención de Salida (40% OFF -> $11.90 USD)
    var exitOldPriceEl = document.getElementById('exitOldPrice');
    var exitLocalCurrencyEl = document.getElementById('exitLocalCurrency');
    var exitOfferPriceEl = document.getElementById('exitOfferPrice');
    var exitUsdBadgeEl = document.getElementById('exitUsdBadge');
    var exitCheckoutBtnTextEl = document.getElementById('exitCheckoutBtnText');

    function formatCurrencyAmount(value, info) {
        var val = value;
        if (info.roundTo && info.roundTo > 1) {
            val = Math.round(val / info.roundTo) * info.roundTo;
        }
        try {
            var formattedNum = new Intl.NumberFormat(info.locale || 'es-ES', {
                minimumFractionDigits: info.decimals,
                maximumFractionDigits: info.decimals
            }).format(val);
            return info.symbol + formattedNum;
        } catch (e) {
            return info.symbol + (info.decimals === 0 ? Math.round(val) : val.toFixed(info.decimals));
        }
    }

    function applyCountryPricing(countryKey, isAutoDetected) {
        if (euroCountries.indexOf(countryKey) !== -1) countryKey = 'ES';
        var info = countryCatalog[countryKey] || countryCatalog.USD;
        var resolvedKey = countryCatalog[countryKey] ? countryKey : 'USD';

        if (selectEl && selectEl.value !== resolvedKey) {
            selectEl.value = resolvedKey;
        }

        var activeUsd = isExitDiscountActiveOnPage ? EXIT_USD : BASE_USD;
        var activeUsdStr = activeUsd.toFixed(2);
        var exitUsdStr = EXIT_USD.toFixed(2);
        var baseUsdStr = BASE_USD.toFixed(2);

        var localNow = formatCurrencyAmount(activeUsd * info.rate, info);
        var localBase = formatCurrencyAmount(BASE_USD * info.rate, info);
        var localExit = formatCurrencyAmount(EXIT_USD * info.rate, info);
        var localOld = formatCurrencyAmount(OLD_USD * info.rate, info);

        if (currencyCodeEl) currencyCodeEl.textContent = info.currency;
        if (offerPriceEl) offerPriceEl.textContent = localNow;

        // Actualizar también los precios dentro del Modal de Intención de Salida ($11.90 USD)
        if (exitLocalCurrencyEl) exitLocalCurrencyEl.textContent = info.currency;
        if (exitOfferPriceEl) exitOfferPriceEl.textContent = localExit;

        if (info.currency === 'USD') {
            if (oldPriceEl) {
                oldPriceEl.textContent = isExitDiscountActiveOnPage ? ('$' + baseUsdStr + ' USD') : ('$' + OLD_USD + '.00 USD');
            }
            if (usdBadgeEl) {
                usdBadgeEl.innerHTML = isExitDiscountActiveOnPage
                    ? '<span>🎁 Descuento del 40% activo: <strong>$' + activeUsdStr + ' USD</strong> <del style="opacity:0.7;margin-left:4px;">$' + baseUsdStr + ' USD</del></span>'
                    : '<span>💵 Precio oficial en dólares: <strong>$' + activeUsdStr + ' USD</strong></span>';
            }
            if (checkoutBtnTextEl) {
                checkoutBtnTextEl.textContent = isExitDiscountActiveOnPage
                    ? 'Obtener Acceso con 40% OFF por $' + activeUsdStr + ' USD'
                    : 'Obtener Acceso por $' + activeUsdStr + ' USD';
            }
            if (mobileStickyPriceEl) {
                mobileStickyPriceEl.textContent = isExitDiscountActiveOnPage
                    ? '🎁 40% OFF Activo • $' + activeUsdStr + ' USD'
                    : 'Acceso completo • $' + activeUsdStr + ' USD';
            }
            if (locLabelEl) {
                locLabelEl.textContent = isAutoDetected
                    ? '📍 Ubicación detectada: ' + info.flag + ' ' + info.name + ' (USD)'
                    : '🌎 Moneda seleccionada: ' + info.flag + ' Dólares ($' + activeUsdStr + ' USD)';
            }

            // Textos del modal Exit-Intent en USD
            if (exitOldPriceEl) exitOldPriceEl.textContent = '$' + baseUsdStr + ' USD';
            if (exitUsdBadgeEl) {
                exitUsdBadgeEl.innerHTML = '💵 Precio especial en dólares: <strong>$' + exitUsdStr + ' USD</strong> (Antes $' + baseUsdStr + ' USD)';
            }
            if (exitCheckoutBtnTextEl) {
                exitCheckoutBtnTextEl.textContent = 'Sí, quiero acceder por $' + exitUsdStr + ' USD';
            }
        } else {
            if (oldPriceEl) {
                oldPriceEl.textContent = isExitDiscountActiveOnPage
                    ? (localBase + ' ' + info.currency + ' ($' + baseUsdStr + ' USD)')
                    : (localOld + ' ' + info.currency + ' ($' + OLD_USD + ' USD)');
            }
            if (usdBadgeEl) {
                usdBadgeEl.innerHTML = isExitDiscountActiveOnPage
                    ? '<span>🎁 40% OFF: Equivalente a <strong>$' + activeUsdStr + ' USD</strong> (Antes $' + baseUsdStr + ' USD)</span>'
                    : '<span>💵 Equivalente a <strong>$' + activeUsdStr + ' USD</strong> (Precio oficial en dólares)</span>';
            }
            if (checkoutBtnTextEl) {
                checkoutBtnTextEl.textContent = 'Obtener Acceso por ' + localNow + ' ' + info.currency + ' ($' + activeUsdStr + ' USD)';
            }
            if (mobileStickyPriceEl) {
                mobileStickyPriceEl.textContent = localNow + ' ' + info.currency + ' ($' + activeUsdStr + ' USD)';
            }
            if (locLabelEl) {
                locLabelEl.textContent = isAutoDetected
                    ? '📍 Precio en tu moneda local (' + info.flag + ' ' + info.name + ')'
                    : '📍 Mostrando en moneda de ' + info.flag + ' ' + info.name;
            }

            // Textos del modal Exit-Intent en moneda local + USD siempre visible
            if (exitOldPriceEl) {
                exitOldPriceEl.textContent = localBase + ' ' + info.currency + ' ($' + baseUsdStr + ' USD)';
            }
            if (exitUsdBadgeEl) {
                exitUsdBadgeEl.innerHTML = '💵 Equivalente a <strong>$' + exitUsdStr + ' USD</strong> (Antes $' + baseUsdStr + ' USD)';
            }
            if (exitCheckoutBtnTextEl) {
                exitCheckoutBtnTextEl.textContent = 'Sí, acceder por ' + localExit + ' ' + info.currency + ' ($' + exitUsdStr + ' USD)';
            }
        }
    }

    // Cambio manual desde el selector
    if (selectEl) {
        selectEl.addEventListener('change', function () {
            applyCountryPricing(this.value, false);
        });
    }

    // 6.1 Detección instantánea por zona horaria del navegador (0ms de espera)
    function detectCountryByTimezone() {
        try {
            var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            var tzMap = {
                'America/Asuncion': 'PY',
                'America/Argentina': 'AR',
                'America/Buenos_Aires': 'AR',
                'America/Cordoba': 'AR',
                'America/Mexico_City': 'MX',
                'America/Monterrey': 'MX',
                'America/Tijuana': 'MX',
                'America/Cancun': 'MX',
                'America/Bogota': 'CO',
                'America/Santiago': 'CL',
                'America/Lima': 'PE',
                'Europe/Madrid': 'ES',
                'America/Montevideo': 'UY',
                'America/La_Paz': 'BO',
                'America/Costa_Rica': 'CR',
                'America/Santo_Domingo': 'DO',
                'America/Guatemala': 'GT',
                'America/Sao_Paulo': 'BR',
                'America/Guayaquil': 'EC',
                'America/Panama': 'PA',
                'America/El_Salvador': 'SV'
            };
            for (var key in tzMap) {
                if (tz.indexOf(key) !== -1) return tzMap[key];
            }
        } catch (e) {}
        return 'USD';
    }

    var currentCountry = detectCountryByTimezone();
    applyCountryPricing(currentCountry, true);

    // 6.2 Actualizar tasas de cambio reales del día + confirmar país por IP
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data && data.rates) {
                Object.keys(countryCatalog).forEach(function (k) {
                    var c = countryCatalog[k];
                    if (c.currency !== 'USD' && data.rates[c.currency]) {
                        c.rate = data.rates[c.currency];
                    }
                });
                applyCountryPricing(selectEl ? selectEl.value : currentCountry, true);
            }
        })
        .catch(function () {});

    fetch('https://api.country.is/')
        .then(function (r) { return r.json(); })
        .then(function (geo) {
            if (geo && geo.country) {
                currentCountry = geo.country.toUpperCase();
                applyCountryPricing(currentCountry, true);
            }
        })
        .catch(function () {
            fetch('https://ipwho.is/')
                .then(function (r) { return r.json(); })
                .then(function (geo2) {
                    if (geo2 && geo2.country_code) {
                        currentCountry = geo2.country_code.toUpperCase();
                        applyCountryPricing(currentCountry, true);
                    }
                })
                .catch(function () {});
        });

    // 7. Sistema de Intención de Salida (Exit-Intent) — Oferta 40% OFF ($11.90 USD)
    var exitModal = document.getElementById('exitIntentModal');
    var exitCloseBtn = document.getElementById('exitModalCloseBtn');
    var exitKeepReadingBtn = document.getElementById('exitKeepReadingBtn');
    var exitShown = false;
    var pageLoadedAt = Date.now();

    function activateDiscountOnMainPage() {
        isExitDiscountActiveOnPage = true;
        if (checkoutBtnEl) {
            checkoutBtnEl.href = EXIT_CHECKOUT_URL;
        }
        applyCountryPricing(selectEl ? selectEl.value : currentCountry, false);
    }

    function showExitModal() {
        if (exitShown || !exitModal) return;
        exitShown = true;
        activateDiscountOnMainPage();
        exitModal.classList.add('show');
        exitModal.setAttribute('aria-hidden', 'false');
    }

    function closeExitModal() {
        if (!exitModal) return;
        exitModal.classList.remove('show');
        exitModal.setAttribute('aria-hidden', 'true');
    }

    if (exitCloseBtn) {
        exitCloseBtn.addEventListener('click', closeExitModal);
    }
    if (exitKeepReadingBtn) {
        exitKeepReadingBtn.addEventListener('click', function () {
            closeExitModal();
            var accesoSection = document.getElementById('acceso');
            if (accesoSection) {
                accesoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    if (exitModal) {
        exitModal.addEventListener('click', function (e) {
            if (e.target === exitModal) closeExitModal();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeExitModal();
    });

    // 7.1 Disparo en Computadora: cuando el puntero sube hacia la barra de pestañas / botón cerrar
    document.addEventListener('mouseout', function (e) {
        if (exitShown) return;
        if (Date.now() - pageLoadedAt < 2500) return;
        var from = e.relatedTarget || e.toElement;
        if (!from && e.clientY <= 12) {
            showExitModal();
        }
    });

    // 7.2 Disparo en Celular y Computadora: Botón "Atrás" del navegador (History API)
    try {
        window.history.pushState({ page: 'sales_main' }, '', window.location.href);
        window.addEventListener('popstate', function () {
            if (!exitShown) {
                showExitModal();
            }
        });
    } catch (e) {}

    // 7.3 Disparo en Celular: Scroll rápido hacia arriba tras haber leído buena parte de la página
    var maxScrollY = 0;
    var lastScrollY = window.scrollY || 0;
    window.addEventListener('scroll', function () {
        if (exitShown) return;
        var currentY = window.scrollY || 0;
        var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
        if (currentY > maxScrollY) {
            maxScrollY = currentY;
        }
        // Si ya bajó al menos el 40% de la página y sube de golpe más de 160px buscando salir
        if (docHeight > 600 && (maxScrollY / docHeight) > 0.40 && (lastScrollY - currentY) > 160 && Date.now() - pageLoadedAt > 6000) {
            showExitModal();
        }
        lastScrollY = currentY;
    }, { passive: true });
});
