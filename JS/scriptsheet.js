function login_valiation() {
    const email = document.getElementById("login_email").value;
        if (email === "" || email == null) {
            alert("Email must be filled out");
        }

    const password = document.getElementById("login_pass").value;
        if (password === "" || password == null) {
            alert("Password must be filled out");
        }
    
    if (email !== "" && email != null && password !== "" && password != null) {
        alert("Login Successful");
            return true;
    }   
}

function contact_valiation() {
    const name = document.getElementById("contact_name").value;
        if (name === "" || name == null) {
            alert("Full Name must be filled out");
        }
    const contact_num = document.getElementById("contact_num").value;
        if (contact_num === "" || contact_num == null) {
            alert("Contact Number must be filled out");
        }
    const email = document.getElementById("contact_email").value;
        if (email === "" || email == null) {
            alert("Email must be filled out");
        }
    const company = document.getElementById("contact_company").value;
        if (company === "" || company == null) {
            alert("Company Name must be filled out");
        }
    const place = document.getElementById("contact_place").value;
        if (place === "" || place == null) {
            alert("City/Town/Area must be filled out");
        }

    if (name !== "" && name != null && contact_num !== "" && contact_num != null && email !== "" && email != null && company !== "" && company != null && place !== "" && place != null) {
        alert("Form Submitted Successfully");
            return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const contactNum = document.getElementById('contact_num');
  const charCountSpan = document.getElementById('contact_num_count');

  if (!contactNum || !charCountSpan) return;

    const maxLength = Number(contactNum.getAttribute('maxlength')) || 10;

    const updateCounter = () => {
      const currentLength = contactNum.value.length;
      const remainingChars = maxLength - currentLength;
      charCountSpan.textContent = remainingChars;

        if (remainingChars < 0) {
          charCountSpan.style.color = 'red';
        } else if (remainingChars <= 10) {
          charCountSpan.style.color = 'orange';
        } else {
          charCountSpan.style.color = 'green';
        }
    };

  contactNum.addEventListener('input', updateCounter);
  contactNum.addEventListener('paste', () => {
    setTimeout(updateCounter, 0);
  });

  const form = contactNum.closest('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (contactNum.value.length > maxLength) {
        e.preventDefault();
        contactNum.focus();
        alert(`Contact number is too long. Maximum ${maxLength} characters allowed.`);
      }
    });
  }
  updateCounter();
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.content');
  const loadMoreBtn = container?.querySelector('button.load_more');
  const ITEMS_PER_LOAD = 4;
  let newsData = [];
  let displayedCount = 0;

  function showUnavailableMessage() {
    if (!container) return;
    const msg = document.createElement('div');
    msg.textContent = 'News currently unavailable. Serve site via http://localhost or provide inline JSON fallback.';
    container.insertBefore(msg, loadMoreBtn);
  }

  function fadeIn(div) {
    let opacity = 0;
    const interval = setInterval(() => {
      if (opacity <= 1) {
        opacity += 0.1;
        div.style.opacity = opacity;
      } else clearInterval(interval);
    }, 30);
  }

  function renderNextBatch() {
    if (!container) return;
    const start = displayedCount;
    const end = Math.min(displayedCount + ITEMS_PER_LOAD, newsData.length);
    if (start >= end) return;

    let out = '';
    for (let i = start; i < end; i++) {
      const item = newsData[i] || {};
      out += `
        <div class="News_container">
          <div class="Infor_notice">
            <a href="${item.url || '#'}" class="news-image-link" aria-label="${item.heading || 'Open article'}">
              <img src="${item.image || ''}" alt="${item.heading || 'news image'}">
            </a>
          </div>

          <div class="News_information">
          <h3><a href="${item.url || '#'}" class="news-heading-link">${item.heading || ''}</a></h3>

          <p>${item.paragraph || ''}</p>
          <p id="Publisher_infor">${item.author || ''} | ${item.released || ''}</p>

          <p><a class="read-more" href="${item.url || '#'}" aria-label="Read more about ${item.heading || ''}">Read more ›</a></p>
          </div>
        </div>
        <br>
      `;
    }

    const div = document.createElement('div');
    container.insertBefore(div, loadMoreBtn);
    div.innerHTML = out;
    div.style.opacity = 0;
    fadeIn(div);

    displayedCount = end;
    if (displayedCount >= newsData.length && loadMoreBtn) loadMoreBtn.style.display = 'none';
  }

  function loadInline() {
    const inlineText = document.getElementById('news-data')?.textContent;
    if (!inlineText) return false;
    try {
      const parsed = JSON.parse(inlineText);
      newsData = Array.isArray(parsed.articles) ? parsed.articles
               : Array.isArray(parsed) ? parsed
               : [];
      return newsData.length > 0;
    } catch (e) {
      console.error('Inline JSON parse failed', e);
      return false;
    }
  }

  function loadNews() {
    if (location.protocol === 'file:' && loadInline()) {
      renderNextBatch();
      return;
    }

    fetch('news.meta.json')
      .then(r => {
        if (!r.ok) throw new Error('Fetch failed: ' + r.status);
        return r.json();
      })
      .then(data => {
        newsData = Array.isArray(data.articles) ? data.articles
                 : Array.isArray(data) ? data
                 : [];
        try { localStorage.setItem('news', JSON.stringify(newsData)); } catch (e) {}
        if (newsData.length) renderNextBatch();
        else showUnavailableMessage();
      })
      .catch(err => {
        console.error('Fetch error:', err);
        if (loadInline()) { renderNextBatch(); return; }
        try {
          const cached = JSON.parse(localStorage.getItem('news') || '[]');
          if (Array.isArray(cached) && cached.length) {
            newsData = cached;
            renderNextBatch();
            return;
          }
        } catch (e) {}
        showUnavailableMessage();
      });
  }

  if (loadMoreBtn) loadMoreBtn.addEventListener('click', renderNextBatch);
  loadNews();
});