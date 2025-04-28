/**
 * Language Switcher for NDE Q&A Website
 * Handles language selection and applies translations
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = localStorage.getItem('ndeqa-language') || 'en';
        this.init();
    }
    
    init() {
        // Initialize with the stored language or default to English
        this.setLanguage(this.currentLanguage);
        
        // Set up event listeners for language selection
        const languageLinks = document.querySelectorAll('.language-dropdown a');
        languageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                this.setLanguage(lang);
            });
            
            // Mark the current language as active
            if (link.getAttribute('data-lang') === this.currentLanguage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update the current language display
        this.updateCurrentLangDisplay();
    }
    
    setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language ${lang} not supported.`);
            return;
        }
        
        // Store the language preference
        localStorage.setItem('ndeqa-language', lang);
        this.currentLanguage = lang;
        
        // Update language elements
        this.applyTranslations();
        this.updateLanguageAttributes();
        this.updateCurrentLangDisplay();
        
        // Update active language in dropdown
        const languageLinks = document.querySelectorAll('.language-dropdown a');
        languageLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Dispatch a custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    
    applyTranslations() {
        const translationData = translations[this.currentLanguage];
        if (!translationData) return;
        
        // Apply translations to all elements with data-lang-key attributes
        const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translationData[key]) {
                // Handle special cases for input placeholders
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translationData[key];
                } else {
                    element.textContent = translationData[key];
                }
            }
        });
    }
    
    updateLanguageAttributes() {
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', this.currentLanguage);
        
        // Update any direction attributes if needed (for RTL languages like Arabic)
        if (this.currentLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }
    
    updateCurrentLangDisplay() {
        // Update the current language display in the selector
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            // Display language code in uppercase
            currentLangElement.textContent = this.getLanguageDisplayName(this.currentLanguage);
        }
    }
    
    getLanguageDisplayName(langCode) {
        // Return a human-readable display name for the language code
        const displayNames = {
            'en': 'EN',
            'zh-CN': '中文',
            'zh-TW': '繁體',
            'es': 'ES',
            'fr': 'FR',
            'ru': 'RU'
        };
        
        return displayNames[langCode] || langCode.toUpperCase();
    }
}

// Initialize language switcher after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
}); 