// ====== POPUP MODAL ======
// Show modal on page load
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('noticeModal');
    if (modal) {
        // Check if user has seen the modal before (using sessionStorage for current session only)
        const hasSeenModal = sessionStorage.getItem('cyberdev_modal_seen');
        if (!hasSeenModal) {
            setTimeout(() => {
                modal.classList.remove('hidden');
            }, 800); // Show after 800ms delay
        }
    }
});

// Close modal function
function closeNoticeModal() {
    const modal = document.getElementById('noticeModal');
    if (modal) {
        modal.classList.add('hidden');
        // Save to sessionStorage so it doesn't show again in this session
        sessionStorage.setItem('cyberdev_modal_seen', 'true');
    }
}

// Close modal when clicking on overlay (outside modal content)
document.addEventListener('click', (e) => {
    const modal = document.getElementById('noticeModal');
    if (modal && e.target === modal) {
        closeNoticeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNoticeModal();
    }
});

// ====== NAVBAR SCROLL EFFECT ======
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }

    // Active nav link & sidebar link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    // Update navbar links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
    
    // Update sidebar links
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== GLOBAL SIDEBAR ======
function toggleGlobalSidebar() {
    const sidebar = document.getElementById('globalSidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking on a link (mobile only)
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            const sidebar = document.getElementById('globalSidebar');
            sidebar.classList.remove('active');
        }
    });
});

// ====== MOBILE MENU ======
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ====== TABS ======
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetTab = document.getElementById('tab-' + tabName);
    if (targetTab) {
        targetTab.style.display = 'block';
    }

    event.target.classList.add('active');
}

// ====== WIKI TABS ======
function showWikiTab(tabName) {
    document.querySelectorAll('.wiki-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.wiki-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetTab = document.getElementById('wiki-tab-' + tabName);
    if (targetTab) {
        targetTab.style.display = 'grid';
    }

    event.target.closest('.wiki-tab-btn').classList.add('active');
    
    // Update sidebar visibility
    document.querySelectorAll('.wiki-sidebar-section').forEach(section => {
        section.style.display = 'none';
    });
    const sidebarSection = document.getElementById('sidebar-' + tabName);
    if (sidebarSection) {
        sidebarSection.style.display = 'block';
    }
}

// ====== COPY CODE ======
function copyCode(btn) {
    const codeBlock = btn.parentElement;
    const text = codeBlock.textContent
        .replace('Copy', '')
        .replace('Done!', '')
        .trim();

    function onSuccess() {
        showToast('تم نسخ الكود بنجاح! 📋');
        btn.innerHTML = '<i class="fas fa-check"></i> Done!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
            fallbackCopy(text) && onSuccess();
        });
    } else {
        fallbackCopy(text) && onSuccess();
    }
}

function fallbackCopy(text) {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    } catch (e) {
        return false;
    }
}

// ====== TOAST ======
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.style.display = 'flex';
    toast.classList.remove('show');
    void toast.offsetHeight;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 400);
    }, 3000);
}

// ====== CONTACT FORM ======
function handleSubmit(e) {
    e.preventDefault();
    showToast('تم إرسال رسالتك بنجاح! سنرد عليك قريبًا 💌');
    e.target.reset();
}

// ====== SCROLL REVEAL ======
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ====== ANIMATED COUNTER ======
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe scan count for animation
const scanCountEl = document.getElementById('scanCount');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(scanCountEl, 25, 1500);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counterObserver.observe(scanCountEl);

// ====== SMOOTH SCROLL FOR DOCS SIDEBAR ======
document.querySelectorAll('.docs-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        document.querySelectorAll('.docs-nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ====== TERMINAL RE-ANIMATION ======
// Re-trigger terminal animation when hero is in view
const terminalBody = document.getElementById('terminalBody');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lines = terminalBody.querySelectorAll('.terminal-line');
            lines.forEach(line => {
                line.style.animation = 'none';
                line.offsetHeight; // Trigger reflow
                line.style.animation = '';
            });
        }
    });
}, { threshold: 0.3 });
heroObserver.observe(document.getElementById('home'));

// ====== KEYBOARD SHORTCUTS ======
document.addEventListener('keydown', (e) => {
    // Press '/' to scroll to docs
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            document.getElementById('docs').scrollIntoView({ behavior: 'smooth' });
        }
    }
    // Press Escape to close mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
    }
});
