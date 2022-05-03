// ! boshlangich qiymat berish ishladi ( i = 0 )  --> ishladi funcksiyani chaqirib quyish kerak
// elementdan tashqariga bosilganda element yuqolishi e.target === modal

window.addEventListener("DOMContentLoaded", () => {
  // loader
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1000);
  // tabs

  const tabContent = document.querySelectorAll(".tabcontent"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsParents = document.querySelector(".tabheader__items");

  function tabHideContent() {
    tabContent.forEach((element) => {
      // elementlar bir xil bulishi kerak pastdagi foreach bn
      element.style.display = "none";
      // console.log(element);
    });
    tabs.forEach((element) => {
      // console.log(element);
      element.classList.remove("tabheader__item_active");
      //* item.style.classList.remove("tabheader__item") Xatolik beradi va 1ta elementni oladi
    });
  }

  function tabShowContent(i = 2) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  tabHideContent();
  tabShowContent();

  tabsParents.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item"))
      tabs.forEach((element, i) => {
        if (e.target == element) {
          // console.log(element);
          console.log(i);
          tabHideContent();
          tabShowContent(i);
        }
      });
  });

  //! Modal
  //massivga addeventListener qilib bulmaydi, foreach aylantirib chiqish kerak
  const dataModal = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector(".modal__close");

  dataModal.forEach((modal) => {
    modal.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
  });

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalShow);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "visible";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // const modalShow = setTimeout(openModal, 15000);

  window.addEventListener("scroll", showModalByScroll); // windowga hodisa qushish
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  //DATA
  // Date.parse(endTime) -- string formatda kiritilgan malumotni(vaqtni)  milli sekunda qaytaradi
  // Date.parse(new Date())
  // Math.floor()-- kottasini
  // Math.ceil() -- kichinasini
  // Math.round()-- kottasini

  const dedline = "2022-03-31";

  // getTime(dedline);
  function getTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function formatTime(number) {
    if (number >= 0 && number < 10) return "0" + number;
    else return number;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const time = getTime(endTime);
      days.innerHTML = formatTime(time.days);
      hours.innerHTML = formatTime(time.hours);
      minutes.innerHTML = formatTime(time.minutes);
      seconds.innerHTML = formatTime(time.seconds);

      if (total <= 0) {
        clearInterval(setInterval);
      }
    }
  }

  setClock(".timer", dedline);

  // Class

  class Card {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 10.5;
      this.change();
    }

    change() {
      this.change = this.change * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((element) => {
          element.classList.add(this.classes);
        });
      }

      element.innerHTML = `

      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> $</div>
        </div>
      </div>
      `;

      this.parent.append(element);
    }
  }

  new Card(
    "img/tabs/2.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    `The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    "199.000",
    ".menu .container"
    // "opacity" ishlamadi
    // "border-radius"
  ).render();
  new Card(
    "img/tabs/3.jpg",
    "vegy",
    "2021 Mercedes-Benz CLA-Class",
    `The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant
    interior, and easy-to-use tech features, but it also has a firm
    ride and a ..`,
    "299.000",
    ".menu .container"
  ).render();
  new Card(
    "img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz SCLA-Class",
    `The German luxury car-manufacturer has been around for more than a
    century, having elegantly drifted rough curves of automobile.`,
    "399.000",
    ".menu .container"
  ).render();

  // Slider

  // const offerSlide = document.querySelectorAll(".offer__slide"),
  // offerPrev = document.querySelector(".offer__slider-prev"),
  // offerNext = document.querySelector(".offer__slider-next"),
  // current = document.querySelector("#current");
  // totall = document.querySelector("#total");
  // console.log(offerSlide);
  // let sliderIndex = 1;
  // show(sliderIndex);
  // function show(s) {
  //   if (s > offerSlide.length) {
  //     sliderIndex = 1;
  //   }
  //   if (s < 1) {
  //     sliderIndex = offerSlide.length;
  //   }

  //   offerSlide.forEach((item) => (item.style.cssText = "display:none"));
  //   offerSlide[sliderIndex - 1].style.display = "block";
  //   if (offerSlide.length < 10) {
  //     current.textContent = `0${sliderIndex}`;
  //   } else {
  //     current.textContent = sliderIndex;
  //   }
  // }

  // function sliderPlus(s) {
  //   show((sliderIndex += 1));
  // }

  // offerPrev.addEventListener("click", () => {
  //   sliderPlus(-1);
  //   console.log("click Prev");
  // });

  // offerNext.addEventListener("click", () => {
  //   sliderPlus(1);
  //   console.log("click Next");
  // });

  //! CARUSEL SLIDER

  const offerSlide = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    offerPrev = document.querySelector(".offer__slider-prev"),
    offerNext = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    totall = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    sliderFuild = document.querySelector(".offer__slider-inner");

  sliderFuild.style.width = 100 * offerSlide.length + "%";

  sliderFuild.style.display = "flex";
  sliderFuild.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  offerSlide.forEach((item) => {
    item.style.width = width;
  });
  slider.style.position = "relative";

  let indicator = document.createElement("ol");
  let dots = [];
  indicator.style.cssText = `
      position:absolute;
      right:0;
      left:0;
      bottom:0;
      z-index:15;
      display:flex;
      justify-content:center;
      margin:0 auto;
      margin-right:15%;
      margin-left:15%;
      list-style:none;
    `;

  for (let i = 0; i < offerSlide.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
              box-sizing:content-box;
              flex: 0 1 auto;
              width:24px;
              height:6px;
              margin: 8px 3px;
              cursor:pointer;
              background-color:white;
              background-clip:padding-box;
              border-top: 10px solid translate;
              border-bottom: 10px id translate;
              opacity:0.2;
              transform: opacity .4 ease;
            `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicator.append(dot);
    dots.push(dot);
  }

  slider.append(indicator);
  let sliderIndex = 1;
  let offset = 0;

  if (offerSlide.length < 10) {
    totall.textContent = `0${offerSlide.length}`;
    current.textContent = `0${sliderIndex}`;
  } else {
    totall.textContent = offerSlide.length;
    current.textContent = sliderIndex;
  }

  offerNext.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (offerSlide.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    sliderFuild.style.transform = `translateX(-${offset}px)`;

    if (sliderIndex == offerSlide.length) {
      sliderIndex = 1;
    } else {
      sliderIndex++;
    }

    if (sliderIndex < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = "0.18"));
    dots[sliderIndex - 1].style.opacity = 1;
  });

  offerPrev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (offerSlide.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    sliderFuild.style.transform = `translateX(-${offset}px)`;

    if (sliderIndex == 1) {
      sliderIndex = offerSlide.length;
    } else {
      sliderIndex--;
    }

    if (sliderIndex < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }
    dots.forEach((dot) => (dot.style.opacity = "0.18"));
    dots[sliderIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      sliderIndex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      sliderFuild.style.transform = `translateX(-${offset}px)`;

      if (sliderIndex < 10) {
        current.textContent = `0${sliderIndex}`;
      } else {
        current.textContent = sliderIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = "0.18"));
      dots[sliderIndex - 1].style.opacity = 1;
    });
  });

  // Accordion

  const accordion = document.querySelectorAll(".accordion");
  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");

      const panel = acc.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
