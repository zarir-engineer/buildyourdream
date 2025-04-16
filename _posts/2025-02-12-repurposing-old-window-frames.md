---
layout: post-base
author: zarir
date:   2024-11-20 19:16:49 +0100
title: Repurposing Old Window Frames
categories: [jekyll, tutorial]
tags: [jekyll, markdown, blog]
lead_text: "A World of Luxury, Heritage, and Opportunity...."
featured_image: /assets/images/posts/1920-1400-repurposing-old-window-frames.jpg
comments: true
gallery:
  - "/buildyourdream/assets/images/blog8.jpg"
  - "/buildyourdream/assets/images/blog6.jpg"
---


Vivamus interdum suscipit lacus. Nunc ultrices accumsan mattis. Aliquam vel sem vel velit efficitur malesuada.  
Donec arcu lacus, ornare eget ligula vel, commodo luctus felis. Ut dignissim sapien sit amet molestie rutrum.

Nam dui mauris, congue vel nisi in, tempus gravida enim. Nulla et tristique orci.  
Pellentesque lectus sapien, maximus id gravida sit amet, tristique non eros.

> **Photography is the story I fail to put into words.**  
> — *Destin Sparks*

### Aliquam vel sem vel vellesuada

Vivamus interdum suscipit lacus. Nunc ultrices accumsan mattis. Aliquam vel sem vel velit efficitur malesuada.  

### Gallery
<ul class="gallery gallery-columns-2">
  {% for image in page.gallery %}
  <li class="gallery-item">
    <figure>
      <img src="{{ image }}" alt="Gallery Image {{ forloop.index }}">
    </figure>
  </li>
  {% endfor %}
</ul>

Nam dui mauris, congue vel nisi in, tempus gravida enim. Nulla et tristique orci.  

- Donec arcu lacus, ornare eget ligula vel, commodo luctus felis.
- Ut dignissim sapien sit amet molestie rutrum.
- Orci varius natoque penatibus et magnis dis parturient montes.
- Ut at nulla ut libero mollis viverra sed vitae purus.

Nam dui mauris, congue vel nisi in, tempus gravida enim. Nulla et tristique orci.  
Pellentesque lectus sapien, maximus id gravida sit amet, tristique non eros.
