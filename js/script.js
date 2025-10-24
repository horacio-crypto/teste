// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const typewriter = document.getElementById('typewriter');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentFlag = document.getElementById('currentFlag');
const currentLang = document.getElementById('currentLang');

// Theme Toggle
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle && currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Mobile Navigation
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isOpen);
        
        // Focus management
        if (!isOpen) {
            const firstNavLink = navMenu.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
    });
    
    // Keyboard navigation
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// Close mobile menu when clicking on links
if (navLinks.length > 0 && navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Active Navigation Link with throttling
window.addEventListener('scroll', throttle(() => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// Back to top button with pulse animation
let backToTopPulseTimeout;

// Consolidated scroll handler with throttling
window.addEventListener('scroll', throttle(() => {
    // Update scroll progress
    updateScrollProgress();
    
    // Back to Top Button
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
            // Add pulse animation after 3 seconds of being visible
            clearTimeout(backToTopPulseTimeout);
            backToTopPulseTimeout = setTimeout(() => {
                backToTop.classList.add('pulse');
            }, 3000);
        } else {
            backToTop.classList.remove('show');
            backToTop.classList.remove('pulse');
            clearTimeout(backToTopPulseTimeout);
        }
    }
}, 100));

if (backToTop) {
    backToTop.addEventListener('click', () => {
        backToTop.classList.remove('pulse');
        clearTimeout(backToTopPulseTimeout);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}



// Typewriter Effect
let texts = [
    'Dados e IA',
    'Desenvolvedor'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typewriter) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 200;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 4000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 10000;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Language Selector
if (langBtn && langDropdown) {
    langBtn.addEventListener('click', () => {
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
}

// Translations
const translations = {
    pt: {
        'nav.home': 'Início',
        'nav.about': 'Sobre',
        'nav.services': 'Serviços',
        'nav.skills': 'Skills',
        'nav.projects': 'Projetos',
        'nav.blog': 'Blog',
        'nav.contact': 'Contato',
        'hero.badge': 'Dados e IA',
        'hero.greeting': 'Eu sou o',
        'hero.description': 'Meu objetivo é transformar complexidade em simplicidade',
        'hero.viewProjects': 'Ver Projetos',
        'hero.contact': 'Contato',
        'hero.available': 'Disponível para projetos',
        'hero.floating.data': 'Dados',
        'hero.floating.ai': 'IA',
        'hero.floating.frontend': 'Frontend',
        'about.subtitle': 'Conheça mais',
        'about.title': 'Sobre Mim',
        'about.intro': 'Desenvolvo soluções digitais que tornam a vida das pessoas mais simples.',
        'about.description': 'Profissional da área tecnologia especializado em dados, com experiência na análise, engenharia e ciência de dados, tendo atuado em empresas de destaque do mercado financeiro. Possui experiência no desenvolvimento de pipelines de dados, implementação e monitoramento de modelos de Machine Learning, além da criação de dashboards. Atua com ferramentas como Python, SQL, Power BI, PySpark, AWS e Excel com foco em automação e geração de valor.',
        'about.education': 'Formação',
        'about.experience': 'Experiência',
        'about.certifications': 'Certificações',
        'about.downloadCV': 'Download CV',
        'timeline.ceo.title': 'CEO e Fundador - Empresa',
        'timeline.ceo.description': 'Descrição da empresa',
        'timeline.itau.title': 'Engenharia de Dados e Machine Learning - Itaú Unibanco',
        'timeline.itau.description': 'Responsável por garantir tratamento, consistência e qualidade dos dados',
        'timeline.fgc.title': 'Pesquisa e Modelagem de Riscos - FGC',
        'timeline.fgc.description': 'Responsável pela estabilidade do Sistema Financeiro Nacional',
        'services.subtitle': 'O que eu faço',
        'services.title': 'Como eu posso te ajudar',
        'services.data.title': 'Dados',
        'services.data.description': 'Desenvolvo soluções completas de dados, desde a coleta e processamento até a criação de dashboards interativos e processamento de modelos preditivos que transformam informações em vantagem competitiva.',
        'services.data.feature1': 'Python & R',
        'services.data.feature2': 'Power BI & Excel',
        'services.data.feature3': 'Machine Learning',
        'services.data.feature4': 'SQL & AWS',
        'services.automation.title': 'Automação',
        'services.automation.description': 'Crio soluções inteligentes de automação utilizando Python e RStudio, desenvolvendo scripts e pipelines que otimizam processos, reduzem custos operacionais e aumentam a eficiência organizacional.',
        'services.automation.feature1': 'Python Scripts',
        'services.automation.feature2': 'RStudio',
        'services.automation.feature3': 'Process Automation',
        'services.automation.feature4': 'Data Pipeline',
        'services.frontend.title': 'Desenvolvimento Web',
        'services.frontend.description': 'Construo experiências digitais modernas e responsivas, desenvolvendo desde landing pages de alta conversão até aplicações web complexas com foco em performance, usabilidade e design atrativo.',
        'services.frontend.feature1': 'HTML & CSS',
        'services.frontend.feature2': 'JavaScript & React',
        'services.frontend.feature3': 'Node.js',
        'services.frontend.feature4': 'Design Responsivo',
        'skills.subtitle': 'Minhas especialidades',
        'skills.title': 'Ferramentas de Trabalho',
        'skills.data.title': 'Dados',
        'skills.data.python': 'Análise de dados e machine learning',
        'skills.data.powerbi': 'Visualização de dados e dashboards',
        'skills.data.sql': 'Consultas e manipulação de dados',
        'skills.data.ml': 'Modelos preditivos e IA',
        'skills.frontend.title': 'Frontend',
        'skills.frontend.react': 'Biblioteca JavaScript para interfaces',
        'skills.frontend.js': 'Linguagem de programação moderna',
        'skills.frontend.html': 'Linguagem de marcação semântica',
        'skills.frontend.css': 'Estilização e animações avançadas',
        'skills.level.expert': 'Expert',
        'skills.level.advanced': 'Avançado',
        'skills.level.intermediate': 'Intermediário',
        'projects.subtitle': 'Meu trabalho',
        'projects.title': 'Projetos em destaque',
        'projects.filter.all': 'Todos',
        'projects.filter.web': 'Web',
        'projects.filter.data': 'Dados',
        'projects.web.category': 'Web Application',
        'projects.web.title': 'Website Portfolio v1',
        'projects.web.description': 'Criação de uma página web simples para apresentação e portfólio.',
        'projects.data.category': 'Análise de Dados',
        'projects.data.title': 'Dashboard Financeiro',
        'projects.data.description': 'Projeto desenvolvido no Power BI para monitorar o desempenho de um negócio, entender tendências e apresentar informações de forma clara.',
        'projects.ecommerce.category': 'Análise de Dados',
        'projects.ecommerce.title': 'Dashboard Vendas',
        'projects.ecommerce.description': 'Projeto desenvolvido no Power BI para monitorar o desempenho de vendas, entender tendências e apresentar informações de forma clara.',
        'testimonials.subtitle': 'Feedback',
        'testimonials.title': 'O que as pessoas dizem sobre mim',
        'testimonials.testimonial1.text': 'Trabalhei com o Niwan durante quase um ano em um time de Engenharia de Dados e posso dizer que é um profissional super organizado, com muito comprometimento nos projetos em que atua e sempre demonstrando uma grande vontade de aprender.',
        'testimonials.testimonial1.name': 'Cinthia Barreto',
        'testimonials.testimonial1.role': 'Engenheira de Dados',
        'testimonials.testimonial2.text': 'Niwan é um profissional muito competente e dedicado. Entrou no nosso time como estagiário e rapidamente já conseguia tocar as atividades apoiando os engenheiros mais experientes, sempre tendo pró-atividade para contribuir com as demandas do time.',
        'testimonials.testimonial2.name': 'Rafael Costa',
        'testimonials.testimonial2.role': 'Technical Lead',
        'testimonials.testimonial3.text': 'Niwan atua com total responsabilidade, atitude de dono, provocativo na busca de soluções e sempre focado, garantindo que suas atividades gerem valor tanto para o banco quanto para nossos clientes.',
        'testimonials.testimonial3.name': 'Anderson Lopes',
        'testimonials.testimonial3.role': 'Subject Matter Expert',
        'blog.subtitle': 'Últimas novidades',
        'blog.title': 'Blog & Insights',
        'blog.post1.title': 'Início no Itaú Unibanco',
        'blog.post1.description': 'Nesta publicação, compartilho a conquista de trabalhar no Itaú Unibanco.',
        'blog.post2.title': 'Aprovação Harvard',
        'blog.post2.description': 'Nessa publicação, compartilho minha aprovação no curso Fundamentos dos Negócios de Harvard.',
        'blog.post3.title': 'Aprovação Santander Coders',
        'blog.post3.description': 'Neste post, compartilho minha trajetória até a aprovação no programa Santander Coders em Data Science.',
        'blog.readMore': 'Ler mais',
        'blog.category.career': 'Carreira',
        'blog.category.certification': 'Certificação',
        'blog.category.publication': 'Publicação',
        'exit.title': 'Espere!',
        'exit.text': 'Não posso deixar você ir embora sem antes te agradecer pela visita. Obrigado! Caso precise de ajuda com meus conhecimentos, estou à disposição.',
        'exit.viewProjects': 'Ver Projetos',
        'exit.contact': 'Entrar em Contato',
        'exit.dismiss': 'Talvez depois',
        'contact.subtitle': 'Vamos conversar',
        'contact.title': 'Sinta-se à vontade para entrar em contato',
        'contact.heading': 'Vamos trabalhar juntos!',
        'contact.description': 'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte da sua visão.',
        'contact.email': 'Email',
        'contact.phone': 'Telefone',
        'contact.location': 'Localização',
        'contact.form.name': 'Nome *',
        'contact.form.email': 'Email *',
        'contact.form.subject': 'Assunto *',
        'contact.form.message': 'Mensagem *',
        'contact.form.send': 'Enviar Mensagem',
        'footer.description': 'Engenheiro de Dados especializado em Python, SQL, Power BI e Machine Learning.',
        'footer.navigation': 'Navegação',
        'footer.services': 'Serviços',
        'footer.contact': 'Contato',
        'footer.rights': 'Niwan Bernardo Batista. Todos os direitos reservados.',
        'footer.cloud': 'Cloud',
        'whatsapp.title': 'Fale comigo no WhatsApp',
        'backToTop.title': 'Voltar ao topo',
        'chatbot.greeting': 'Olá! 👋 Sou o Neo IA, assistente do Niwan.',
        'chatbot.canHelp': 'Posso responder sobre:',
        'chatbot.education': '🎓 Formação e experiência',
        'chatbot.projects': '💼 Projetos e trabalhos',
        'chatbot.skills': '🛠️ Habilidades técnicas',
        'chatbot.contact': '📞 Informações de contato',
        'chatbot.btn.skills': 'Habilidades',
        'chatbot.btn.experience': 'Experiência',
        'chatbot.btn.projects': 'Projetos',
        'chatbot.btn.contact': 'Contato',
        'chatbot.questions.skills': 'Quais são suas habilidades técnicas?',
        'chatbot.questions.experience': 'Conte sobre sua experiência profissional',
        'chatbot.questions.projects': 'Quais projetos você já desenvolveu?',
        'chatbot.questions.contact': 'Como posso entrar em contato?',
        'chatbot.responses.greeting': 'Olá! 👋 Sou o Neo IA, assistente do Niwan. Como posso ajudá-lo hoje?',
        'chatbot.responses.thanks': 'Fico feliz em ajudar! 😊 Há mais alguma coisa que gostaria de saber?',
        'chatbot.responses.fallback': 'Interessante pergunta! Posso ajudar com informações sobre formação, experiência, projetos ou contato do Niwan. 🤔',
        'chatbot.responses.skills': 'Habilidades do Niwan:\n\n🔥 Expert: Python, SQL, HTML5, CSS3\n⚡ Avançado: Power BI, Excel, JavaScript, PySpark\n📈 Intermediário: AWS, React, Figma',
        'chatbot.responses.experience': 'O Niwan tem 2+ anos de experiência. Atualmente trabalha como Engenheiro de Dados e Machine Learning no Itaú Unibanco, responsável por garantir tratamento, consistência e qualidade dos dados. 🏢',
        'chatbot.responses.projects': 'Principais projetos do Niwan:\n\n• **Dashboard Financeiro**: Projeto no Power BI para monitorar desempenho de negócios\n• **Dashboard Vendas**: Análise de vendas com Power BI e DAX\n• **Website Portfolio**: Site pessoal desenvolvido em HTML, CSS e JavaScript\n\nTodos focados em transformar dados em insights! 📊✨',
        'chatbot.responses.contact': 'Formas de contato:\n\n📧 Email: niwan-bernardo@hotmail.com\n📱 WhatsApp: (+55) 11 991359164\n💼 LinkedIn: linkedin.com/in/niwanbatista\n\nEscolha a que preferir! 😊'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'hero.badge': 'Data & AI',
        'hero.greeting': 'Hello, I am',
        'hero.description': 'My goal is to transform complexity into simplicity',
        'hero.viewProjects': 'View Projects',
        'hero.contact': 'Contact',
        'hero.available': 'Available for projects',
        'hero.floating.data': 'Data',
        'hero.floating.ai': 'AI',
        'hero.floating.frontend': 'Frontend',
        'about.subtitle': 'Get to know more',
        'about.title': 'About Me',
        'about.intro': 'My name is Niwan Bernardo Batista, a technology professional, pursuing a Bachelor\'s degree in Data Science at the Virtual University of São Paulo State (UNIVESP).',
        'about.description': 'Currently, I work in Data Engineering and Machine Learning at Itaú Unibanco, where I am responsible for ensuring data treatment, consistency and quality.',
        'about.education': 'Education',
        'about.experience': 'Experience',
        'about.certifications': 'Certifications',
        'about.downloadCV': 'Download CV',
        'timeline.ceo.title': 'CEO and Founder - Company',
        'timeline.ceo.description': 'Company description',
        'timeline.itau.title': 'Data Engineering and Machine Learning - Itaú Unibanco',
        'timeline.itau.description': 'Responsible for ensuring data treatment, consistency and quality',
        'timeline.fgc.title': 'Research and Risk Modeling - FGC',
        'timeline.fgc.description': 'Responsible for the stability of the National Financial System',
        'services.subtitle': 'What I do',
        'services.title': 'How I can help you',
        'services.data.title': 'Data',
        'services.data.description': 'I develop complete data solutions, from collection and processing to creating interactive dashboards and processing predictive models that transform information into competitive advantage.',
        'services.data.feature1': 'Python & R',
        'services.data.feature2': 'Power BI & Excel',
        'services.data.feature3': 'Machine Learning',
        'services.data.feature4': 'SQL & AWS',
        'services.automation.title': 'Automation',
        'services.automation.description': 'I create intelligent automation solutions using Python and RStudio, developing scripts and pipelines that optimize processes, reduce operational costs and increase organizational efficiency.',
        'services.automation.feature1': 'Python Scripts',
        'services.automation.feature2': 'RStudio',
        'services.automation.feature3': 'Process Automation',
        'services.automation.feature4': 'Data Pipeline',
        'services.frontend.title': 'Web Development',
        'services.frontend.description': 'I build modern and responsive digital experiences, developing from high-conversion landing pages to complex web applications focused on performance, usability and attractive design.',
        'services.frontend.feature1': 'HTML & CSS',
        'services.frontend.feature2': 'JavaScript & React',
        'services.frontend.feature3': 'Node.js',
        'services.frontend.feature4': 'Responsive Design',
        'skills.subtitle': 'My specialties',
        'skills.title': 'Work Tools',
        'skills.data.title': 'Data',
        'skills.data.python': 'Data analysis and machine learning',
        'skills.data.powerbi': 'Data visualization and dashboards',
        'skills.data.sql': 'Queries and data manipulation',
        'skills.data.ml': 'Predictive models and AI',
        'skills.frontend.title': 'Web Development',
        'skills.frontend.react': 'JavaScript library for interfaces',
        'skills.frontend.js': 'Modern programming language',
        'skills.frontend.html': 'Semantic markup language',
        'skills.frontend.css': 'Advanced styling and animations',
        'skills.level.expert': 'Expert',
        'skills.level.advanced': 'Advanced',
        'skills.level.intermediate': 'Intermediate',
        'projects.subtitle': 'My work',
        'projects.title': 'Featured Projects',
        'projects.filter.all': 'All',
        'projects.filter.web': 'Web',
        'projects.filter.data': 'Data',
        'projects.web.category': 'Web Application',
        'projects.web.title': 'Website Portfolio v1',
        'projects.web.description': 'Creating a simple web page for presentation and portfolio.',
        'projects.data.category': 'Data Analysis',
        'projects.data.title': 'Financial Dashboard',
        'projects.data.description': 'Project developed in Power BI to monitor business performance, understand trends and present information clearly.',
        'projects.ecommerce.category': 'Data Analysis',
        'projects.ecommerce.title': 'Sales Dashboard',
        'projects.ecommerce.description': 'Project developed in Power BI to monitor sales performance, understand trends and present information clearly.',
        'testimonials.subtitle': 'Feedback',
        'testimonials.title': 'What people say about me',
        'testimonials.testimonial1.text': 'I worked with Niwan for almost a year in a Data Engineering team and I can say he is a super organized professional, with great commitment to the projects he works on and always showing a great willingness to learn.',
        'testimonials.testimonial1.name': 'Cinthia Barreto',
        'testimonials.testimonial1.role': 'Data Engineer',
        'testimonials.testimonial2.text': 'Niwan is a very competent and dedicated professional. He joined our team as an intern and quickly was able to handle activities supporting more experienced engineers, always being proactive to contribute to the team\'s demands.',
        'testimonials.testimonial2.name': 'Rafael Costa',
        'testimonials.testimonial2.role': 'Technical Lead',
        'testimonials.testimonial3.text': 'Niwan works with total responsibility, owner attitude, provocative in the search for solutions and always focused, ensuring that his activities generate value for both the bank and our customers.',
        'testimonials.testimonial3.name': 'Anderson Lopes',
        'testimonials.testimonial3.role': 'Subject Matter Expert',
        'blog.subtitle': 'Latest news',
        'blog.title': 'Blog & Insights',
        'blog.post1.title': 'Starting at Itaú Unibanco',
        'blog.post1.description': 'In this post, I share the achievement of working at Itaú Unibanco.',
        'blog.post2.title': 'Harvard Approval',
        'blog.post2.description': 'In this post, I share my approval in Harvard\'s Business Fundamentals course.',
        'blog.post3.title': 'Santander Coders Approval',
        'blog.post3.description': 'In this post, I share my journey to approval in the Santander Coders program in Data Science.',
        'blog.readMore': 'Read more',
        'blog.category.career': 'Career',
        'blog.category.certification': 'Certification',
        'blog.category.publication': 'Publication',
        'exit.title': 'Wait!',
        'exit.text': 'Thank you for your visit! But, how long will you keep postponing your dreams due to lack of resources? I can help you with my skills!',
        'exit.viewProjects': 'View Projects',
        'exit.contact': 'Get in Touch',
        'exit.dismiss': 'Maybe later',
        'contact.subtitle': 'Let\'s talk',
        'contact.title': 'Feel free to get in touch',
        'contact.heading': 'Let\'s work together!',
        'contact.description': 'I am always open to discussing new projects, creative ideas or opportunities to be part of your vision.',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.form.name': 'Name *',
        'contact.form.email': 'Email *',
        'contact.form.subject': 'Subject *',
        'contact.form.message': 'Message *',
        'contact.form.send': 'Send Message',
        'footer.description': 'Data Engineer specialized in creating innovative digital solutions.',
        'footer.navigation': 'Navigation',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.rights': 'Niwan Bernardo Batista. All rights reserved.',
        'whatsapp.title': 'Talk to me on WhatsApp',
        'backToTop.title': 'Back to top',
        'chatbot.greeting': 'Hello! 👋 I am Neo AI, Niwan\'s assistant.',
        'chatbot.canHelp': 'I can answer about:',
        'chatbot.education': '🎓 Education and experience',
        'chatbot.projects': '💼 Projects and work',
        'chatbot.skills': '🛠️ Technical skills',
        'chatbot.contact': '📞 Contact information',
        'chatbot.btn.skills': 'Skills',
        'chatbot.btn.experience': 'Experience',
        'chatbot.btn.projects': 'Projects',
        'chatbot.btn.contact': 'Contact',
        'chatbot.questions.skills': 'What are your technical skills?',
        'chatbot.questions.experience': 'Tell me about your professional experience',
        'chatbot.questions.projects': 'What projects have you developed?',
        'chatbot.questions.contact': 'How can I get in touch?',
        'chatbot.responses.greeting': 'Hello! 👋 I am Neo AI, Niwan\'s assistant. How can I help you today?',
        'chatbot.responses.thanks': 'Happy to help! 😊 Is there anything else you\'d like to know?',
        'chatbot.responses.fallback': 'Interesting question! I can help with information about education, experience, projects or Niwan\'s contact. 🤔',
        'chatbot.responses.skills': 'Niwan\'s skills:\n\n🔥 Expert: Python, SQL, HTML5, CSS3\n⚡ Advanced: Power BI, Excel, JavaScript, PySpark\n📈 Intermediate: AWS, React, Figma',
        'chatbot.responses.experience': 'Niwan has 2+ years of experience. Currently works as Data Engineer and Machine Learning at Itaú Unibanco, responsible for ensuring data treatment, consistency and quality. 🏢',
        'chatbot.responses.projects': 'Niwan\'s main projects:\n\n• **Financial Dashboard**: Power BI project to monitor business performance\n• **Sales Dashboard**: Sales analysis with Power BI and DAX\n• **Portfolio Website**: Personal website developed in HTML, CSS and JavaScript\n\nAll focused on transforming data into insights! 📊✨',
        'chatbot.responses.contact': 'Contact options:\n\n📧 Email: niwan-bernardo@hotmail.com\n📱 WhatsApp: (+55) 11 991359164\n💼 LinkedIn: linkedin.com/in/niwanbatista\n\nChoose your preferred one! 😊'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.about': 'Acerca',
        'nav.services': 'Servicios',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Proyectos',
        'nav.blog': 'Blog',
        'nav.contact': 'Contacto',
        'hero.badge': 'Datos e IA',
        'hero.greeting': 'Hola, soy',
        'hero.description': 'Mi objetivo es transformar la complejidad en simplicidad',
        'hero.viewProjects': 'Ver Proyectos',
        'hero.contact': 'Contacto',
        'hero.available': 'Disponible para proyectos',
        'hero.floating.data': 'Datos',
        'hero.floating.ai': 'IA',
        'hero.floating.frontend': 'Frontend',
        'about.subtitle': 'Conoce más',
        'about.title': 'Sobre Mí',
        'about.intro': 'Me llamo Niwan Bernardo Batista, profesional del área de tecnología, cursando Licenciatura en Ciencia de Datos en la Universidad Virtual del Estado de São Paulo (UNIVESP).',
        'about.description': 'Actualmente, trabajo en el área de Ingeniería de Datos y Machine Learning en Itaú Unibanco, donde soy responsable de garantizar el tratamiento, consistencia y calidad de los datos.',
        'about.education': 'Formación',
        'about.experience': 'Experiencia',
        'about.certifications': 'Certificaciones',
        'timeline.ceo.title': 'CEO y Fundador - Empresa',
        'timeline.ceo.description': 'Descripción de la empresa',
        'timeline.itau.title': 'Ingeniería de Datos y Machine Learning - Itaú Unibanco',
        'timeline.itau.description': 'Responsable de garantizar el tratamiento, consistencia y calidad de los datos',
        'timeline.fgc.title': 'Investigación y Modelado de Riesgos - FGC',
        'timeline.fgc.description': 'Responsable de la estabilidad del Sistema Financiero Nacional',
        'services.subtitle': 'Lo que hago',
        'services.title': 'Cómo puedo ayudarte',
        'services.data.title': 'Datos',
        'services.data.description': 'Desarrollo soluciones completas de datos, desde la recolección y procesamiento hasta la creación de dashboards interactivos y procesamiento de modelos predictivos que transforman información en ventaja competitiva.',
        'services.data.feature1': 'Python & R',
        'services.data.feature2': 'Power BI & Excel',
        'services.data.feature3': 'Machine Learning',
        'services.data.feature4': 'SQL & AWS',
        'services.automation.title': 'Automatización',
        'services.automation.description': 'Creo soluciones inteligentes de automatización utilizando Python y RStudio, desarrollando scripts y pipelines que optimizan procesos, reducen costos operacionales y aumentan la eficiencia organizacional.',
        'services.automation.feature1': 'Python Scripts',
        'services.automation.feature2': 'RStudio',
        'services.automation.feature3': 'Automatización de Procesos',
        'services.automation.feature4': 'Pipeline de Datos',
        'services.frontend.title': 'Desarrollo Web',
        'services.frontend.description': 'Construyo experiencias digitales modernas y responsivas, desarrollando desde landing pages de alta conversión hasta aplicaciones web complejas con enfoque en rendimiento, usabilidad y diseño atractivo.',
        'services.frontend.feature1': 'HTML & CSS',
        'services.frontend.feature2': 'JavaScript & React',
        'services.frontend.feature3': 'Node.js',
        'services.frontend.feature4': 'Diseño Responsivo',
        'skills.subtitle': 'Mis especialidades',
        'skills.title': 'Herramientas de Trabajo',
        'skills.data.title': 'Datos',
        'skills.data.python': 'Análisis de datos y machine learning',
        'skills.data.powerbi': 'Visualización de datos y dashboards',
        'skills.data.sql': 'Consultas y manipulación de datos',
        'skills.data.ml': 'Modelos predictivos e IA',
        'skills.frontend.title': 'Desarrollo Web',
        'skills.frontend.react': 'Biblioteca JavaScript para interfaces',
        'skills.frontend.js': 'Lenguaje de programación moderno',
        'skills.frontend.html': 'Lenguaje de marcado semántico',
        'skills.frontend.css': 'Estilización y animaciones avanzadas',
        'skills.level.expert': 'Experto',
        'skills.level.advanced': 'Avanzado',
        'skills.level.intermediate': 'Intermedio',
        'projects.subtitle': 'Mi trabajo',
        'projects.title': 'Proyectos Destacados',
        'projects.filter.all': 'Todos',
        'projects.filter.web': 'Web',
        'projects.filter.data': 'Datos',
        'projects.web.category': 'Aplicación Web',
        'projects.web.title': 'Sitio Web Portfolio v1',
        'projects.web.description': 'Creación de una página web simple para presentación y portfolio.',
        'projects.data.category': 'Análisis de Datos',
        'projects.data.title': 'Dashboard Financiero',
        'projects.data.description': 'Proyecto desarrollado en Power BI para monitorear el rendimiento de un negocio, entender tendencias y presentar información de forma clara.',
        'projects.ecommerce.category': 'Análisis de Datos',
        'projects.ecommerce.title': 'Dashboard de Ventas',
        'projects.ecommerce.description': 'Proyecto desarrollado en Power BI para monitorear el rendimiento de ventas, entender tendencias y presentar información de forma clara.',
        'testimonials.subtitle': 'Feedback',
        'testimonials.title': 'Lo que las personas dicen sobre mí',
        'testimonials.testimonial1.text': 'Trabajé con Niwan durante casi un año en un equipo de Ingeniería de Datos y puedo decir que es un profesional super organizado, con mucho compromiso en los proyectos en los que actúa y siempre demostrando una gran voluntad de aprender.',
        'testimonials.testimonial1.name': 'Cinthia Barreto',
        'testimonials.testimonial1.role': 'Ingeniera de Datos',
        'testimonials.testimonial2.text': 'Niwan es un profesional muy competente y dedicado. Entró a nuestro equipo como pasante y rápidamente ya podía manejar las actividades apoyando a los ingenieros más experimentados, siempre teniendo proactividad para contribuir con las demandas del equipo.',
        'testimonials.testimonial2.name': 'Rafael Costa',
        'testimonials.testimonial2.role': 'Technical Lead',
        'testimonials.testimonial3.text': 'Niwan actúa con total responsabilidad, actitud de dueño, provocativo en la búsqueda de soluciones y siempre enfocado, garantizando que sus actividades generen valor tanto para el banco como para nuestros clientes.',
        'testimonials.testimonial3.name': 'Anderson Lopes',
        'testimonials.testimonial3.role': 'Subject Matter Expert',
        'blog.subtitle': 'Últimas noticias',
        'blog.title': 'Blog e Insights',
        'blog.post1.title': 'Inicio en Itaú Unibanco',
        'blog.post1.description': 'En esta publicación, comparto el logro de trabajar en Itaú Unibanco.',
        'blog.post2.title': 'Aprobación Harvard',
        'blog.post2.description': 'En esta publicación, comparto mi aprobación en el curso Fundamentos de Negocios de Harvard.',
        'blog.post3.title': 'Aprobación Santander Coders',
        'blog.post3.description': 'En este post, comparto mi trayectoria hasta la aprobación en el programa Santander Coders en Data Science.',
        'blog.readMore': 'Leer más',
        'blog.category.career': 'Carrera',
        'blog.category.certification': 'Certificación',
        'blog.category.publication': 'Publicación',
        'exit.title': '¡Espera!',
        'exit.text': '¡Gracias por tu visita! Pero, ¿hasta cuándo seguirás posponiendo tus sueños por falta de recursos? ¡Puedo ayudarte con mis habilidades!',
        'exit.viewProjects': 'Ver Proyectos',
        'exit.contact': 'Contactar',
        'exit.dismiss': 'Quizás después',
        'contact.subtitle': 'Hablemos',
        'contact.title': 'Siéntete libre de ponerte en contacto',
        'contact.heading': '¡Trabajemos juntos!',
        'contact.description': 'Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades de ser parte de tu visión.',
        'contact.email': 'Email',
        'contact.phone': 'Teléfono',
        'contact.location': 'Ubicación',
        'contact.form.name': 'Nombre *',
        'contact.form.email': 'Email *',
        'contact.form.subject': 'Asunto *',
        'contact.form.message': 'Mensaje *',
        'contact.form.send': 'Enviar Mensaje',
        'footer.description': 'Ingeniero de Datos especializado en crear soluciones digitales innovadoras.',
        'footer.navigation': 'Navegación',
        'footer.services': 'Servicios',
        'footer.contact': 'Contacto',
        'footer.rights': 'Niwan Bernardo Batista. Todos los derechos reservados.',
        'whatsapp.title': 'Háblame por WhatsApp',
        'backToTop.title': 'Volver arriba',
        'chatbot.greeting': '¡Hola! 👋 Soy Neo IA, asistente de Niwan.',
        'chatbot.canHelp': 'Puedo responder sobre:',
        'chatbot.education': '🎓 Formación y experiencia',
        'chatbot.projects': '💼 Proyectos y trabajos',
        'chatbot.skills': '🛠️ Habilidades técnicas',
        'chatbot.contact': '📞 Información de contacto',
        'chatbot.btn.skills': 'Habilidades',
        'chatbot.btn.experience': 'Experiencia',
        'chatbot.btn.projects': 'Proyectos',
        'chatbot.btn.contact': 'Contacto',
        'chatbot.questions.skills': '¿Cuáles son tus habilidades técnicas?',
        'chatbot.questions.experience': 'Cuéntame sobre tu experiencia profesional',
        'chatbot.questions.projects': '¿Qué proyectos has desarrollado?',
        'chatbot.questions.contact': '¿Cómo puedo contactarte?',
        'chatbot.responses.greeting': '¡Hola! 👋 Soy Neo IA, asistente de Niwan. ¿Cómo puedo ayudarte hoy?',
        'chatbot.responses.thanks': '¡Me alegra ayudar! 😊 ¿Hay algo más que te gustaría saber?',
        'chatbot.responses.fallback': '¡Pregunta interesante! Puedo ayudar con información sobre formación, experiencia, proyectos o contacto de Niwan. 🤔',
        'chatbot.responses.skills': 'Habilidades de Niwan:\n\n🔥 Experto: Python, SQL, HTML5, CSS3\n⚡ Avanzado: Power BI, Excel, JavaScript, PySpark\n📈 Intermedio: AWS, React, Figma',
        'chatbot.responses.experience': 'Niwan tiene 2+ años de experiencia. Actualmente trabaja como Ingeniero de Datos y Machine Learning en Itaú Unibanco, responsable de garantizar el tratamiento, consistencia y calidad de los datos. 🏢',
        'chatbot.responses.projects': 'Principales proyectos de Niwan:\n\n• **Dashboard Financiero**: Proyecto en Power BI para monitorear rendimiento empresarial\n• **Dashboard de Ventas**: Análisis de ventas con Power BI y DAX\n• **Sitio Web Portfolio**: Sitio personal desarrollado en HTML, CSS y JavaScript\n\n¡Todos enfocados en transformar datos en insights! 📊✨',
        'chatbot.responses.contact': 'Opciones de contacto:\n\n📧 Email: niwan-bernardo@hotmail.com\n📱 WhatsApp: (+55) 11 991359164\n💼 LinkedIn: linkedin.com/in/niwanbatista\n\n¡Elige la que prefieras! 😊'
    }
};

// Function to change language
function changeLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update typewriter texts based on language
    const typewriterTexts = {
        pt: ['Dados e IA', 'Desenvolvedor'],
        en: ['Data & AI', 'Developer'],
        es: ['Datos e IA', 'Desarrollador']
    };
    
    // Update the global texts array
    texts = typewriterTexts[lang] || typewriterTexts.pt;
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typewriter) {
        typewriter.textContent = '';
        setTimeout(typeWriter, 500);
    }
}

// Language options (Desktop)
if (currentFlag && currentLang && langDropdown) {
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            const flag = option.querySelector('img').src;
            
            currentFlag.src = flag;
            currentLang.textContent = lang.toUpperCase();
            langDropdown.classList.remove('active');
            
            // Store language preference
            localStorage.setItem('language', lang);
            
            // Change language
            changeLanguage(lang);
        });
    });
}

// Mobile Language options
document.querySelectorAll('.mobile-lang-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        
        // Remove active class from all mobile options
        document.querySelectorAll('.mobile-lang-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update desktop selector if exists
        if (currentFlag && currentLang) {
            const flag = option.querySelector('img').src;
            currentFlag.src = flag;
            currentLang.textContent = lang.toUpperCase();
        }
        
        // Store language preference
        localStorage.setItem('language', lang);
        
        // Change language
        changeLanguage(lang);
        
        // Close mobile menu
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Load saved language
const savedLang = localStorage.getItem('language') || 'pt';
if (savedLang !== 'pt' && currentFlag && currentLang) {
    const langOption = document.querySelector(`[data-lang="${savedLang}"]`);
    if (langOption) {
        const flag = langOption.querySelector('img').src;
        currentFlag.src = flag;
        currentLang.textContent = savedLang.toUpperCase();
        changeLanguage(savedLang);
    }
} else {
    changeLanguage('pt');
}

// Update mobile language selector active state
document.querySelectorAll('.mobile-lang-option').forEach(option => {
    if (option.getAttribute('data-lang') === savedLang) {
        option.classList.add('active');
    } else {
        option.classList.remove('active');
    }
});

// Start typewriter animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typewriter) {
        setTimeout(typeWriter, 500);
    }
});

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'geometric-shape';
        
        // Random shape
        const shapes = ['shape-circle', 'shape-triangle', 'shape-square', 'shape-hexagon'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        particle.classList.add(randomShape);
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Project Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Testimonials Slider Functionality
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtnMobile = document.getElementById('prevBtnMobile');
const nextBtnMobile = document.getElementById('nextBtnMobile');
let currentSlide = 0;
let autoSlideInterval;
let isUserInteracting = false;
const USER_INTERACTION_TIMEOUT = 5000;

if (testimonialCards.length > 0 && navDots.length > 0) {
    // Function to show specific slide
    function showSlide(index) {
        // Hide all cards
        testimonialCards.forEach(card => card.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected card
        testimonialCards[index].classList.add('active');
        navDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    // Function to start auto-slide
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, 20000); // 20 seconds
    }
    
    // Function to stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Add click event to navigation arrows (desktop)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoSlide();
            prevSlide();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoSlide();
            }, USER_INTERACTION_TIMEOUT);
        });
        
        // Keyboard support
        prevBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prevBtn.click();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoSlide();
            nextSlide();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoSlide();
            }, USER_INTERACTION_TIMEOUT);
        });
        
        // Keyboard support
        nextBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nextBtn.click();
            }
        });
    }
    
    // Add click event to navigation arrows (mobile)
    if (prevBtnMobile) {
        prevBtnMobile.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoSlide();
            prevSlide();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoSlide();
            }, USER_INTERACTION_TIMEOUT);
        });
        
        // Keyboard support
        prevBtnMobile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prevBtnMobile.click();
            }
        });
    }
    
    if (nextBtnMobile) {
        nextBtnMobile.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoSlide();
            nextSlide();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoSlide();
            }, USER_INTERACTION_TIMEOUT);
        });
        
        // Keyboard support
        nextBtnMobile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nextBtnMobile.click();
            }
        });
    }
    
    // Add click event to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoSlide();
            showSlide(index);
            setTimeout(() => {
                isUserInteracting = false;
                startAutoSlide();
            }, USER_INTERACTION_TIMEOUT);
        });
        
        // Keyboard support
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
    });
    
    // Start auto-slide
    startAutoSlide();
}

// EmailJS Configuration
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('cagXneXnye2bcXV84');
    }
})();

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Niwan Batista'
        };
        
        // Simple validation
        if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
            showFormMessage('Preencha todos os campos', '#ef4444', submitBtn, originalText, originalBg);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(templateParams.from_email)) {
            showFormMessage('Email inválido', '#ef4444', submitBtn, originalText, originalBg);
            return;
        }
        
        // Send email using EmailJS (fallback to success message if EmailJS not configured)
        if (typeof emailjs !== 'undefined' && emailjs.send) {
            emailjs.send('service_wzl9au9', 'template_fg9kg47', templateParams)
                .then(function(response) {
                    showFormMessage('<i class="fas fa-check"></i> <span>Mensagem enviada com sucesso!</span>', '#10b981', submitBtn, originalText, originalBg);
                    contactForm.reset();
                }, function(error) {
                    showFormMessage('Erro ao enviar. Tente novamente.', '#ef4444', submitBtn, originalText, originalBg);
                });
        } else {
            // Fallback - simulate success (for demo purposes)
            setTimeout(() => {
                showFormMessage('<i class="fas fa-check"></i> <span>Mensagem enviada!</span>', '#10b981', submitBtn, originalText, originalBg);
                contactForm.reset();
            }, 1500);
        }
    });
}

// Helper function to show form messages
function showFormMessage(message, color, submitBtn, originalText, originalBg) {
    submitBtn.innerHTML = message;
    submitBtn.style.background = color;
    submitBtn.disabled = false;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = originalBg;
    }, 4000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Intelligent Chatbot
class IntelligentChatbot {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotBadge = document.getElementById('chatbot-badge');
        
        this.conversationHistory = [];
        this.userContext = {
            hasAskedAbout: [],
            interests: [],
            sessionStart: Date.now()
        };
        
        this.knowledge = {
            personal: {
                name: 'Niwan Bernardo Batista',
                location: 'São Paulo, SP',
                role: 'Engenheiro de Dados e Machine Learning no Itaú Unibanco',
                passion: 'desenvolver soluções digitais que tornam a vida das pessoas mais simples'
            },
            education: {
                current: 'Bacharelado em Ciência de Dados na UNIVESP',
                certifications: ['Google Data Analytics', 'Santander Coders', 'ADA Tech', 'Harvard'],
                focus: 'Ciência de Dados, Machine Learning e Engenharia de Dados'
            },
            work: {
                current: 'Engenharia de Dados e Machine Learning - Itaú Unibanco (2024-presente)',
                previous: 'Pesquisa e Modelagem de Riscos - FGC (2024)',
                experience: '2+ anos em dados',
                responsibilities: 'desenvolvimento de pipelines de dados, implementação e monitoramento de modelos de ML, criação de dashboards'
            },
            skills: {
                expert: ['Python', 'SQL', 'HTML5', 'CSS3'],
                advanced: ['Power BI', 'Excel', 'JavaScript', 'PySpark'],
                intermediate: ['AWS', 'React', 'Figma'],
                tools: ['Python', 'SQL', 'Power BI', 'PySpark', 'AWS', 'Excel']
            },
            projects: {
                'Dashboard Financeiro': 'Projeto no Power BI para monitorar desempenho de negócios',
                'Dashboard Vendas': 'Análise de vendas com Power BI e DAX',
                'Website Portfolio': 'Site pessoal desenvolvido em HTML, CSS e JavaScript'
            },
            contact: {
                email: 'niwan-bernardo@hotmail.com',
                phone: '(+55) 11 991359164',
                linkedin: 'linkedin.com/in/niwanbatista',
                github: 'github.com/niwanbernardo',
                instagram: 'instagram.com/niwanbatista'
            },
            services: {
                'Dados': 'Python, SQL, Power BI, PySpark, AWS, Excel, Machine Learning',
                'Desenvolvimento Web': 'HTML, CSS, JavaScript, React, Node.js, Design Responsivo',
                'Automação': 'Python Scripts, RStudio, Process Automation, Data Pipeline'
            }
        };
        

        
        this.init();
        this.showBadge();
    }
    
    showBadge() {
        setTimeout(() => {
            if (this.chatbotBadge) {
                this.chatbotBadge.classList.add('show');
            }
        }, 3000);
    }
    
    init() {
        if (this.chatbotToggle) {
            this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (this.chatbotClose) {
            this.chatbotClose.addEventListener('click', () => this.closeChat());
        }
        
        if (this.chatbotSend) {
            this.chatbotSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.chatbotInput) {
            this.chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Quick questions
        const quickQuestions = document.querySelectorAll('.quick-question');
        quickQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const questionKey = question.getAttribute('data-question');
                this.sendQuickQuestion(questionKey);
            });
        });
        
        // Verificar se todos os elementos necessários existem
        if (!this.chatbotMessages || !this.chatbotInput) {
            console.warn('Chatbot: Elementos necessários não encontrados');
        }
    }
    
    toggleChat() {
        if (this.chatbotContainer) {
            const isActive = this.chatbotContainer.classList.contains('active');
            this.chatbotContainer.classList.toggle('active');
            
            // Hide badge when chat is opened
            if (!isActive && this.chatbotBadge) {
                this.chatbotBadge.classList.remove('show');
            }
            
            // Toggle icon
            const icon = this.chatbotToggle.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.className = 'fas fa-comment-dots';
                    this.chatbotToggle.classList.remove('active');
                } else {
                    icon.className = 'fas fa-times';
                    this.chatbotToggle.classList.add('active');
                }
            }
        }
    }
    
    closeChat() {
        if (this.chatbotContainer) {
            this.chatbotContainer.classList.remove('active');
            
            // Reset icon to comment-dots
            const icon = this.chatbotToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-comment-dots';
                this.chatbotToggle.classList.remove('active');
            }
        }
    }
    
    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.chatbotInput.value = '';
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    sendQuickQuestion(questionKey) {
        const currentLang = localStorage.getItem('language') || 'pt';
        const questionText = translations[currentLang][`chatbot.questions.${questionKey}`] || questionKey;
        
        this.addMessage(questionText, 'user');
        
        setTimeout(() => {
            const response = this.generateResponse(questionText);
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('i');
        avatarIcon.className = `fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}`;
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        const contentP = document.createElement('p');
        if (content && typeof content === 'string' && content.length <= 1000) {
            contentP.textContent = content;
        } else {
            contentP.textContent = 'Mensagem inválida';
        }
        contentDiv.appendChild(contentP);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }
    
    generateResponse(message) {
        const msg = message.toLowerCase().trim();
        const currentLang = localStorage.getItem('language') || 'pt';
        this.conversationHistory.push({ user: message, timestamp: Date.now() });
        
        // Saudações
        if (this.isGreeting(msg)) {
            return translations[currentLang]['chatbot.responses.greeting'];
        }
        
        // Agradecimentos
        if (this.isThanking(msg)) {
            return translations[currentLang]['chatbot.responses.thanks'];
        }
        
        // Perguntas sobre habilidades (prioridade alta)
        if (this.isAboutSkills(msg)) {
            return translations[currentLang]['chatbot.responses.skills'];
        }
        
        // Perguntas sobre trabalho/carreira ou experiência
        if (this.isAboutWork(msg) || this.isAboutExperience(msg)) {
            return translations[currentLang]['chatbot.responses.experience'];
        }
        
        // Perguntas sobre projetos
        if (this.isAboutProjects(msg)) {
            return translations[currentLang]['chatbot.responses.projects'];
        }
        
        // Perguntas sobre contato
        if (this.isAboutContact(msg)) {
            return translations[currentLang]['chatbot.responses.contact'];
        }
        
        // Resposta padrão
        return translations[currentLang]['chatbot.responses.fallback'];
    }
    
    isGreeting(msg) {
        const greetings = ['oi', 'olá', 'hello', 'hi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hey'];
        return greetings.some(greeting => msg.includes(greeting));
    }
    
    isThanking(msg) {
        const thanks = ['obrigado', 'obrigada', 'valeu', 'thanks', 'thank you', 'brigado', 'vlw'];
        return thanks.some(thank => msg.includes(thank));
    }
    
    isAboutPerson(msg) {
        const keywords = ['quem é', 'quem e', 'sobre', 'idade', 'anos', 'nome', 'niwan', 'pessoa'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutWork(msg) {
        const keywords = ['trabalho', 'emprego', 'empresa', 'itau', 'itaú', 'carreira', 'profissão', 'onde trabalha', 'work', 'job', 'company', 'career', 'profession', 'trabajo', 'empleo', 'carrera', 'profesión'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutExperience(msg) {
        const keywords = ['experiência', 'experience', 'experiencia', 'professional', 'profissional'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutEducation(msg) {
        const keywords = ['formação', 'educação', 'estuda', 'faculdade', 'curso', 'universidade', 'univesp', 'certificação'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutSkills(msg) {
        const keywords = ['habilidades', 'skills', 'tecnologias', 'ferramentas', 'python', 'sql', 'power bi', 'javascript', 'react', 'technologies', 'tools', 'technical', 'técnicas', 'tecnologías', 'herramientas', 'técnicas'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutProjects(msg) {
        const keywords = ['projetos', 'portfolio', 'portfólio', 'trabalhos', 'dashboard', 'website', 'projects', 'work', 'proyectos', 'trabajos', 'desarrollado', 'developed'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutContact(msg) {
        const keywords = ['contato', 'email', 'telefone', 'whatsapp', 'linkedin', 'como falar', 'entrar em contato', 'contact', 'phone', 'get in touch', 'contacto', 'teléfono', 'contactar', 'cómo contactar'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    
    isAboutServices(msg) {
        const keywords = ['serviços', 'serviço', 'o que faz', 'como pode ajudar', 'análise', 'desenvolvimento', 'automação'];
        return keywords.some(keyword => msg.includes(keyword));
    }
    

    

    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('i');
        avatarIcon.className = `fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}`;
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Support for formatted text
        if (content && typeof content === 'string' && content.length <= 2000) {
            // Convert markdown-like formatting and preserve icons
            const formattedContent = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            
            // Check if content contains HTML (like icons)
            if (content.includes('<i class=')) {
                contentDiv.innerHTML = formattedContent;
            } else {
                contentDiv.textContent = content;
            }
        } else {
            contentDiv.textContent = 'Mensagem muito longa ou inválida';
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        
        // Track conversation context
        if (sender === 'bot') {
            this.updateUserContext(content);
        }
    }
    
    updateUserContext(response) {
        if (response.includes('trabalho') || response.includes('Itaú')) {
            this.userContext.hasAskedAbout.push('work');
        }
        if (response.includes('habilidades') || response.includes('Python')) {
            this.userContext.hasAskedAbout.push('skills');
        }
        if (response.includes('projetos') || response.includes('Dashboard')) {
            this.userContext.hasAskedAbout.push('projects');
        }
    }
}

// Google Analytics Event Tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track important interactions
function initAnalyticsTracking() {
    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = btn.textContent.trim();
            trackEvent('button_click', {
                button_text: buttonText,
                button_location: btn.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track project views
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const projectTitle = link.closest('.project-card').querySelector('h3')?.textContent;
            trackEvent('project_view', {
                project_name: projectTitle,
                link_url: link.href
            });
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.href.includes('linkedin') ? 'LinkedIn' : 
                           link.href.includes('github') ? 'GitHub' : 
                           link.href.includes('instagram') ? 'Instagram' : 'Unknown';
            trackEvent('social_click', {
                platform: platform,
                location: link.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track WhatsApp clicks
    document.querySelector('.whatsapp-float')?.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
            location: 'floating_button'
        });
    });
    
    // Track chatbot interactions
    document.getElementById('chatbot-toggle')?.addEventListener('click', () => {
        trackEvent('chatbot_open', {});
    });
    
    // Track form submissions
    document.getElementById('contact-form')?.addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_type: 'contact'
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            trackEvent('scroll_depth', {
                percent: scrollPercent
            });
        }
    }, 1000));
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                trackEvent('section_view', {
                    section_name: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Exit Intent Detection
class ExitIntentDetector {
    constructor() {
        this.modal = document.getElementById('exit-intent-modal');
        this.closeBtn = document.getElementById('exit-intent-close');
        this.viewProjectsBtn = document.getElementById('exit-view-projects');
        this.contactBtn = document.getElementById('exit-contact');
        
        this.hasShown = false;
        this.timeOnSite = 0;
        this.scrollDepth = 0;
        this.startTime = Date.now();
        
        this.init();
    }
    
    init() {
        // Track time on site
        setInterval(() => {
            this.timeOnSite = Date.now() - this.startTime;
        }, 1000);
        
        // Track scroll depth
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            this.scrollDepth = Math.max(this.scrollDepth, scrollPercent);
        });
        
        // Exit intent detection
        document.addEventListener('mouseleave', (e) => {
            if (this.shouldShowModal(e)) {
                this.showModal();
            }
        });
        
        // Close modal events
        this.closeBtn?.addEventListener('click', () => this.hideModal());
        
        // Action buttons
        this.viewProjectsBtn?.addEventListener('click', () => {
            this.hideModal();
            this.trackAction('view_projects');
        });
        
        this.contactBtn?.addEventListener('click', () => {
            this.hideModal();
            this.trackAction('contact');
        });
        
        // Close on background click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
                this.hideModal();
            }
        });
    }
    
    shouldShowModal(e) {
        // Don't show if already shown
        if (this.hasShown) return false;
        
        // Don't show on mobile
        if (window.innerWidth < 768) return false;
        
        // Only show if mouse is leaving from top of page
        if (e.clientY > 50) return false;
        
        // Only show if user spent at least 10 seconds on site
        if (this.timeOnSite < 10000) return false;
        
        // Only show if user scrolled at least 25%
        if (this.scrollDepth < 25) return false;
        
        return true;
    }
    
    showModal() {
        if (!this.modal) return;
        
        this.hasShown = true;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add pulse animation to primary button after 2 seconds
        setTimeout(() => {
            if (this.viewProjectsBtn) {
                this.viewProjectsBtn.classList.add('pulse');
            }
        }, 2000);
        
        // Track event
        this.trackAction('modal_shown');
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (this.modal.classList.contains('show')) {
                this.hideModal();
            }
        }, 15000);
    }
    
    hideModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Remove pulse animation
        if (this.viewProjectsBtn) {
            this.viewProjectsBtn.classList.remove('pulse');
        }
        
        this.trackAction('modal_closed');
    }
    
    trackAction(action) {
        if (typeof trackEvent === 'function') {
            trackEvent('exit_intent', {
                action: action,
                time_on_site: Math.round(this.timeOnSite / 1000),
                scroll_depth: Math.round(this.scrollDepth)
            });
        }
    }
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    new IntelligentChatbot();
    new ExitIntentDetector();
    initAnalyticsTracking();
});



// Optimized Scroll Animations with Intersection Observer
function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.classList.add('animate');
        });
        return;
    }
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Digital Particles Background (Performance Optimized)
function createDigitalParticles() {
    const container = document.getElementById('theme-matrix');
    if (!container) return;
    
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 20;
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'digital-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
}

// Initialize Digital Particles with performance check
document.addEventListener('DOMContentLoaded', () => {
    // Only create particles if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        createDigitalParticles();
    }
});