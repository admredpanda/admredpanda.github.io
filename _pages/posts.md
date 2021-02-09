---
layout: category
title: "All posts"
permalink: /posts/
author_profile: true
---

<div class="list__item">
{% for post in site.posts %}
  <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
    <h2 class="archive__item-title" itemprop="headline"><a href="{{ post.url | relative_url }}" rel="permalink" >  {{ post.title }} </a> </h2>
    <p class="page__meta">
      <i class="fas fa-calendar-alt" aria-hidden="true"></i> {{ post.date | date: "%Y/%m/%d" }} |
      <i class="far fa-clock" aria-hidden="true"></i>
      {% include read-time.html %}
    </p>
    <p class="archive__item-excerpt" itemprop="description">
      {{ post.excerpt | markdownify | strip_html | truncate: 200 }}
    </p>
  </article>
{% endfor %}
</div>