---
title: "A 64-core mixed-signal in-memory compute chip based on phase-change memory for deep neural network inference"
authors:
  - "Manuel Le Gallo"
  - "Riduan Khaddam-Aljameh"
  - "Milos Stanisavljevic"
  - "Athanasios Vasilopoulos"
  - "Benedikt Kersting"
  - "Martino Dazzi"
  - "Geethan Karunaratne"
  - "Matthias Brändli"
  - "Abhairaj Singh"
  - "Silvia M. Müller"
  - "Julian Büchel"
  - "Xavier Timoneda"
  - "Vinay Joshi"
  - "Malte J. Rasch"
  - "Urs Egger"
  - "Angelo Garofalo"
  - "Anastasios Petropoulos"
  - "Theodore Antonakopoulos"
  - "Kevin Brew"
  - "Samuel Choi"
  - "Injo Ok"
  - "Timothy Philip"
  - "Victor Chan"
  - "Claire Silvestre"
  - "Ishtiaq Ahsan"
  - "Nicole Saulnier"
  - "Vijay Narayanan"
  - "Pier Andrea Francese"
  - "Evangelos Eleftheriou"
  - "Abu Sebastian"
journal: "Nature Electronics"
year: 2023
date: 2023-01-01
doi: "10.1038/s41928-023-01010-1"
source_url: "https://doi.org/10.1038/s41928-023-01010-1"
volume: "6"
issue: "9"
pages: "680-693"
publisher: "Springer Science and Business Media LLC"
priority: 8
tags: ["publications"]
draft: false
---

Analogue in-memory computing (AIMC) with resistive memory devices could reduce the latency and energy consumption of deep neural network inference tasks by directly performing computations within memory. However, to achieve end-to-end improvements in latency and energy consumption, AIMC must be combined with on-chip digital operations and on-chip communication. Here we report a multicore AIMC chip designed and fabricated in 14 nm complementary metal–oxide–semiconductor technology with backend-integrated phase-change memory. The fully integrated chip features 64 AIMC cores interconnected via an on-chip communication network. It also implements the digital activation functions and additional processing involved in individual convolutional layers and long short-term memory units. With this approach, we demonstrate near-software-equivalent inference accuracy with ResNet and long short-term memory networks, while implementing all the computations associated with the weight layers and the activation functions on the chip. For 8-bit input/output matrix–vector multiplications, in the four-phase (high-precision) or one-phase (low-precision) operational read mode, the chip can achieve a maximum throughput of 16.1 or 63.1 tera-operations per second at an energy efficiency of 2.48 or 9.76 tera-operations per second per watt, respectively.
