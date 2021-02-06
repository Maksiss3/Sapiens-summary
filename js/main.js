gsap.registerPlugin(CSSRulePlugin, ScrollTrigger, ScrollToPlugin);


rememberScroll();
checkWindowSize();

window.addEventListener('resize', () =>{
  checkWindowSize();
});


function checkWindowSize(){
  var mq = window.matchMedia( "(max-width: 600px)" );
  if (mq.matches) { // window width is less than 500px
    factStylingMobile();
  } else{
    factStylingDesktop();
  }
}

function readMore(btn) {
  let fact_large = btn.parentElement;
  let more_txt = fact_large.querySelectorAll('.more');
  
  if (btn.innerHTML === "Read more...") {
    btn.innerHTML = "Read less...";
    more_txt.forEach(txt =>{
      txt.style.display = 'inline';
    })
  } else {
    btn.innerHTML = "Read more...";
    more_txt.forEach(txt =>{
      txt.style.display = 'none';
    })
  }
}

function imageBox(btn){
  modulo = document.querySelector('.modulo');
  modulo.querySelector('img').src = btn.dataset.src;
  modulo.querySelector('p').innerHTML = btn.dataset.caption;
  content_box = document.querySelector('.content-box');
  content_box.style.display = "block";
  content_box.addEventListener('click', () =>{
    content_box.style.display = "none";
  })
}

function asideContentTheory(btn){
  let container_large = (btn.parentElement.parentElement.parentElement);
  let asides = container_large.querySelectorAll('aside');

  asides.forEach(aside =>{    //Find the buttons matching content
    if (aside.id.match(btn.id.replace("btn-", ""))){  
      matching_aside = aside;
    }
  });

  var mq = window.matchMedia( "(max-width: 600px)" );
  if (mq.matches) { // window width is less than 500px
    matching_aside.classList.add('aside-box');
    matching_aside.style.display = 'block';
    matching_aside.addEventListener('click', () =>{
      matching_aside.classList.remove('aside-box');
      matching_aside.style.display = "none";
    }, { once: true })
  } else{
    if(matching_aside.id == 'interbreeding'){    //Remove aside if already exists
      matching_aside.classList.add('left');
      matching_aside.style.display = "block";
      asideAnimate(matching_aside, 'left');
    } else if (matching_aside.id == 'replacement'){
      matching_aside.classList.add('right');
      matching_aside.style.display = "block";
      asideAnimate(matching_aside, 'right');
    }
  }
}

let container_obj = {'left': false, 'right': false, 'last':'',};
function asideContentHomo(btn){
  let container_large = (btn.parentElement.parentElement.parentElement);
  let asides = container_large.querySelectorAll('aside');

  asides.forEach(aside =>{    //Find the buttons matching content
    if (aside.id.match(btn.id.replace("btn-", ""))){  
      matching_aside = aside;
    }
  });

  var mq = window.matchMedia( "(max-width: 600px)" );
  if (mq.matches) { // window width is less than 500px
    matching_aside.classList.add('aside-box');
    matching_aside.style.display = 'block';
    matching_aside.addEventListener('click', () =>{
      matching_aside.classList.remove('aside-box');
      matching_aside.style.display = "none";
    }, { once: true })
  } else{
  
    if(matching_aside.id == container_obj.left){    //Remove aside if already exists
      container_obj.left = 0;
      matching_aside.style.display = "none";
      matching_aside.classList.remove('left');
    } else if (matching_aside.id == container_obj.right){
      container_obj.right = 0;
      matching_aside.style.display = "none";
      matching_aside.classList.remove('right');
    } else if (container_obj.left == false ){                  //If true, nothing is open on left side
      toggleAsides(matching_aside.id, 'left', matching_aside, 0)
    } else if (container_obj.right == false){
      toggleAsides(matching_aside.id, 'right', matching_aside, 0)
    } else if(container_obj.right && container_obj.last === 'right') {   //If true, remove previous .left and change to new
      let left_elem = checkForClassArray(asides, 'left');
      toggleAsides(matching_aside.id, 'left', matching_aside, left_elem)
    } else if(container_obj.right && container_obj.last === 'left') {   //If true, remove previous .right and change to new
      let right_elem = checkForClassArray(asides, 'right');
      toggleAsides(matching_aside.id, 'right', matching_aside, right_elem)
    }
  }
}


function checkForClassArray(elem_array, class_to_check){   //Looks for specified class in an array of elements
  elem_array.forEach(elem => {
    if (elem.classList.contains(class_to_check)){
      matching_elem = elem;
    }
  })
  return matching_elem;
}


function toggleAsides (id, add_class, add_class_elem, remove_class_elem){  // Add .right or .left to aside element. Also remove previous, because there can only be one!
  if (remove_class_elem){
    remove_class_elem.classList.remove(add_class);
    remove_class_elem.style.display = "none";
  }
  add_class_elem.classList.add(add_class);
  container_obj[add_class] = id;
  container_obj.last = add_class;
  add_class_elem.style.display = "block";
  asideAnimate(add_class_elem, add_class);
}

function closeParentAside(aside){
  aside.style.display = "none";
  aside_class = aside.classList[0];
  aside.removeAttribute('class');
  container_obj[aside_class] = 0;
}


function rememberScroll(){
  document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = sessionStorage.getItem('scrollpos');
    if (scrollpos) {
      window.scrollTo(0, scrollpos);
      sessionStorage.removeItem('scrollpos');
    }
  });
  window.addEventListener("beforeunload", function (e) {
    sessionStorage.setItem('scrollpos', window.scrollY);
  });
}

function factStylingDesktop(){
  facts_small = document.querySelectorAll('.fact-small');
  facts_small.forEach(function(fact, index){
    if (index % 2 === 0) {
      fact.style = 'transform: translateX(-50%); flex-direction: row-reverse;'
      fact.querySelector('.fact-arrow').style = 'transform: scaleX(-1);'
      fact.querySelector('.fact-circle').style = 'transform: translate(50%, 25%);'
    } else {
      fact.style = 'transform: translateX(50%);'
      fact.querySelector('.fact-circle').style = 'transform: translate(-50%, 25%);'
      fact.querySelector('h3').style = 'margin-left: 1vw;'
    }
  }
  )
}


function factStylingMobile(){
  let facts_small = document.querySelectorAll('.fact-small');
  facts_small.forEach(function(fact, index){
    if (index % 2 === 0) {
      fact.style = 'transform: translateX(0); flex-direction: none;'
      fact.querySelector('.fact-arrow').style = 'transform: scaleX(1);'
      fact.querySelector('.fact-circle').style = 'transform: translate(0, 0);'
    } else {
      fact.style = 'transform: translateX(0);'
      fact.querySelector('.fact-circle').style = 'transform: translate(0, 0);'
      fact.querySelector('h3').style = 'margin-left: 0;'
    }
  })
}


function startBtn(){
  // start();
  setTimeout(function (){
    timelineAnimation();
  }, 10);
}

function timelineAnimation(){
  const time_stamps = document.querySelectorAll('.time');
  time_stamps.forEach((stamp, index) =>{
    timeTimeline(stamp);
  })
  
  const large_facts = document.querySelectorAll('.fact-large');
  large_facts.forEach((fact, index) =>{
    largeFactTimeline(fact);
  })
  
  const small_facts = document.querySelectorAll('.container-small');
  var mq = window.matchMedia( "(max-width: 600px)" );
  if (mq.matches) { // window width is less than 500px
    small_facts.forEach((fact, index) =>{
      smallFactTimelineMob(fact);
    })
  
  } else{
    small_facts.forEach((fact, index) =>{
      if (index % 2 === 0) {
        smallFactTimeline(fact, 50);
      } else {
        smallFactTimeline(fact, -50);
      }
    })
  }
}



//////////////// ANIMATIONS //////////////////////
function start(){
  let offset_height = window.innerHeight * 30.3;
  stars_text = window.innerHeight * 30;
  
  gsap.to('.start-text', {opacity: 1, y: -50, duration: 2,})
  gsap.to('.stars', {duration: 2 , delay: 2, height: 'calc(100vh*30)',});
  gsap.to(window, {delay: 3, duration: 4, ease: "power4.out", scrollTo: {y: offset_height}});
  gsap.to('.stars h2', {opacity: 1});
  gsap.from('.stars h2 .word', { stagger: 0.2, delay: 5, duration: 3, y: 70, opacity: 0, ease: Back.easeInOut.config(0.3)})
  gsap.fromTo('#timeline', {scaleY: 0, opacity: 1},{transformOrigin: "top", duration: 5, ease: "expo.in", scaleY: 1, delay: 6})
}
 
function smallFactTimeline(fact, x){
  circle = fact.querySelector('.fact-circle');
  arrow = fact.querySelector('.fact-arrow');
  text = fact.querySelectorAll('.word');
    var tl = gsap.timeline({
      scrollTrigger:{
        trigger: fact,
        start: "top bottom-=25%",
        toggleActions: "play none none none",
        markers: false,
      }
    })
    .to(fact ,{opacity: 1})
    .from(circle ,{opacity: 0, scale: 0.1, duration: 1})
    .from(arrow ,{opacity: 0, x: 50, ease: 'bounce', duration: 1 }, "-=0.5")
    .from(text, {stagger: 0.1, duration: 0.5, x: x, opacity: 0}, '-=1')
}

function largeFactTimeline(fact){
  h4 = fact.querySelector('h4');
  p = fact.querySelectorAll('p');
  button = fact.querySelectorAll('button');
  let tl = gsap.timeline({
    scrollTrigger:{
      trigger: fact,
      start: "top bottom-=25%",
      toggleActions: "play none none none",
      markers: false,
    }
  })
  .to(fact ,{opacity: 1, duration: 1, boxShadow: "inset 0 0 0 0px transparent"})
  .from(fact, {duration: 1, border: 0}, '-=1')
  .to(h4, {opacity: 1})
  .to(p, {opacity: 1})
  .to(button, {opacity: 1})
}

function timeTimeline(stamp){
  p = stamp.querySelector('p');
    let tl = gsap.timeline({
      scrollTrigger:{
        trigger: stamp,
        start: "top bottom-=25%",
        toggleActions: "play none none none",
        markers: false,
      }
    })
    .to(stamp ,{duration: 1, clipPath: 'inset(0px 0px 0px 0px)'})
    .from(p, {opacity: 0})
}

function smallFactTimelineMob(fact){
  to_split = fact.querySelector('h3');
  const split = Splitting({ target: to_split, by: 'lines' });
  let text = fact.querySelectorAll('.word');
    var tl = gsap.timeline({
      scrollTrigger:{
        trigger: fact,
        start: "top bottom-=25%",
        toggleActions: "play none none none",
      }
    })
    .fromTo(fact , {clipPath: 'inset(0 51% 0 51%)'}, {duration: 1, ease: "expo.in", clipPath: 'inset(0% 0% 0% 0%)'})
    .from(text, {stagger: 0.05, duration: 0.5, y: 50,x: 50, opacity: 0})
}


function asideAnimate(aside, side){
  x = (side == 'left') ? -700 : 700;
  img = aside.querySelector('img');
  desc = aside.querySelector('.desc');
  close_x = aside.querySelector('.close-x');
  var aside_tl = gsap.timeline({onComplete: () => {
    close_x.addEventListener('click', ()=>{
      setTimeout(function (){
        closeParentAside(aside);
      }, 1000);
      aside_tl.reverse();
    }, {once: true})
  }})

  aside_tl.from(img, {x: x, duration: 0.5,})
  aside_tl.fromTo(desc,{clipPath: 'inset(0% 0% 100% 0%)'},{duration: 0.5, clipPath: 'inset(0% 0% 0% 0%)'})
}