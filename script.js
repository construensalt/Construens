// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Reform selection functionality
function selectReform(reformType) {
    const select = document.getElementById('tipoReforma');
    if (select) {
        select.value = reformType;
    }
    
    // Update visual selection
    const options = document.querySelectorAll('.reform-option');
    options.forEach(option => {
        option.classList.remove('border-blue-500', 'bg-blue-100');
        option.classList.add('border-gray-200', 'bg-gray-50');
    });
    
    // Highlight selected option
    event.target.closest('.reform-option').classList.remove('border-gray-200', 'bg-gray-50');
    event.target.closest('.reform-option').classList.add('border-blue-500', 'bg-blue-100');
    
    // Scroll to form
    const form = document.getElementById('budgetForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

// Budget form submission
document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const tipoReforma = document.getElementById('tipoReforma').value;
            const descricao = document.getElementById('descricao').value;
            
            if (!nome || !telefone || !tipoReforma) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            let message = `Olá, quero um orçamento:\n\n`;
            message += `Nome: ${nome}\n`;
            message += `Telefone: ${telefone}\n`;
            if (email) message += `Email: ${email}\n`;
            message += `Tipo de Reforma: ${tipoReforma}\n`;
            message += `Local: São José dos Campos - SP\n`;
            if (descricao) message += `Descrição: ${descricao}\n`;
            
            const whatsappUrl = `https://wa.me/5512999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Reset countdown to 7 days when it expires
            targetDate.setDate(targetDate.getDate() + 7);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Project counter animation
function animateProjectCounter() {
    const counter = document.getElementById('projectCounter');
    if (!counter) return;
    
    const target = 200;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + '+';
    }, 16);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatting
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    // Initialize animations and counters when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'projectCounter') {
                    animateProjectCounter();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const projectCounter = document.getElementById('projectCounter');
    if (projectCounter) {
        observer.observe(projectCounter);
    }
    
    // Start countdown timer
    startCountdown();
});

// Add fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 1s ease-out;
        }
        
        .reform-option {
            transition: all 0.3s ease;
        }
        
        .reform-option:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        /* Smooth transitions for all interactive elements */
        button, .btn, a {
            transition: all 0.3s ease;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    `;
    document.head.appendChild(style);
});