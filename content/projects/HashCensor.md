---
date: '2020-11-29'
title: 'Hash Censorship'
github: 'https://github.com/Jventoo/HatterCensorship'
external: ''
tech:
  - C
company: 'UCSC'
showInProjects: false
---

Checks if supplied input is forbidden and tries to properly censor it to an acceptable alternative, blocking the input if not.  
Features a bloom filter ( O(1) ), a hash table for eliminating false positives and providing translations, linked list chaining for collisions, and regex parsing to support contractions and other abnormal inputs. See [repo](https://github.com/Jventoo/HatterCensorship) for more info.
