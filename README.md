# buildyourhome

| style                   | markdown                               |
|-------------------------|----------------------------------------|
| 🔴 🟠 ⚫ ⚪ 🟣 🟢 🟡 🔵 	 | same                                   |
| ✅ true and ❌false       |                                        |
| underline 	             | <ins>underlined</ins>                  |
| ~~ stroke ~~ 	          | ~~stroke~~ ( no spaces)                |
| italic                  | 	         *italic*                     |
| ==highlight== 	         | ==highlight==                          |
| bold 	                  | **bold **                              |
| red color 	             | `red color`                            |
| blue color 	            | <a>blue color</a>                      |
| other color 	           | <font color=#0fb503>other color</font> |
| <sub></sub>             | <sub>subscript</sub>                   |
| <sup></sup>             | <sup>supscript</sup>                   |

$${\color{red}Welcome \space \color{lightblue}To \space \color{orange}Stackoverflow}$$

![Zarir Engineer](https://zarirengineer.github.io/buildyourhome/assets/images/zarir.png)

| TODO                      |                                     |
|---------------------------|-------------------------------------|
| form from jami gibbs site | http://jamigibbs.github.io/phantom/ |
| send mail                 | formspree                           |
| update blogs              | ref: chatgpt                        |
| modal window on each      | http://jamigibbs.github.io/phantom/ |
| blog.html, ....           |                                     |
| google_analytics          |                                     |
|                           |                                     |

### ffmpeg -i "C:\Users\Asus\Downloads\IMG_0006.MOV" -vf "select=eq(n\,34)" -vframes 1 "C:\Users\Asus\Downloads\alka.png"

### ffmpeg -i "C:\Users\Asus\Downloads\alka.png" -vf scale=660:380 "C:\Users\Asus\Downloads\output_660x380.png"

### ffmpeg -loglevel error -stats -i source.video -map 0:0 -filter:v fps\=24000/1001 -c:v h264_videotoolbox -b:v 8500k -profile 3 -level 41 -coder cabac -threads 4 -allow_sw:v 1 -map 0:1 -c:a:0 copy -disposition:a:0 default -map 0:6 -c:s:0 copy -disposition:s:0 0 -metadata:g title\=“If you want file title in the metadata, goes here” -default_mode passthrough ‘outfile.mkv’

### ffmpeg -i input.mov -c:v h264_videotoolbox -b:v 1000k -c:a aac output.mp4

### https://getbootstrap.com/docs/4.0/components/modal/

### https://stackoverflow.com/questions/6799533/how-to-submit-a-form-with-javascript-by-clicking-a-link

### https://github.com/jeromelachaud/freelancer-theme

### https://stackoverflow.com/questions/50540461/why-is-modal-popup-with-jekyll-and-bootsratp-only-showing-content-of-last-child

### https://alshedivat.github.io/al-folio/blog/


### multiple modals
```html
<!-- Trigger Links -->
<a href="#modal1" class="open-modal" data-modal="modal1">Open Modal 1</a>
<a href="#modal2" class="open-modal" data-modal="modal2">Open Modal 2</a>

<!-- Modal 1 -->
<div id="modal1" class="modal">
  <div class="modal-content">
    <span class="close" data-modal="modal1">&times;</span>
    <h2>Modal 1 Title</h2>
    <p>This is the content of Modal 1.</p>
  </div>
</div>

<!-- Modal 2 -->
<div id="modal2" class="modal">
  <div class="modal-content">
    <span class="close" data-modal="modal2">&times;</span>
    <h2>Modal 2 Title</h2>
    <p>This is the content of Modal 2.</p>
  </div>
</div>
```


```css
/* Modal container */
.modal {
  display: none; /* Hidden by default */
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
}

/* Modal content */
.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

/* Close button */
.close {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #aaa;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
}
```

```javascript
// Open modal functionality
document.querySelectorAll('.open-modal').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
  });
});

// Close modal functionality
document.querySelectorAll('.close').forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  });
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
```