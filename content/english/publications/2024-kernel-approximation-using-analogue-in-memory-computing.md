---
title: "Kernel approximation using analogue in-memory computing"
authors:
  - "Julian Büchel"
  - "Giacomo Camposampiero"
  - "Athanasios Vasilopoulos"
  - "Corey Lammie"
  - "Manuel Le Gallo"
  - "Abbas Rahimi"
  - "Abu Sebastian"
journal: "Nature Machine Intelligence"
year: 2024
date: 2024-01-01
doi: "10.1038/s42256-024-00943-2"
source_url: "https://doi.org/10.1038/s42256-024-00943-2"
volume: "6"
issue: "12"
pages: "1605-1615"
publisher: "Springer Science and Business Media LLC"
priority: 5
tags: ["publications"]
draft: false
---

Kernel functions are vital ingredients of several machine learning (ML) algorithms but often incur substantial memory and computational costs. We introduce an approach to kernel approximation in ML algorithms suitable for mixed-signal analogue in-memory computing (AIMC) architectures. Analogue in-memory kernel approximation addresses the performance bottlenecks of conventional kernel-based methods by executing most operations in approximate kernel methods directly in memory. The IBM HERMES project chip, a state-of-the-art phase-change memory-based AIMC chip, is utilized for the hardware demonstration of kernel approximation. Experimental results show that our method maintains high accuracy, with less than a 1% drop in kernel-based ridge classification benchmarks and within 1% accuracy on the long-range arena benchmark for kernelized attention in transformer neural networks. Compared to traditional digital accelerators, our approach is estimated to deliver superior energy efficiency and lower power consumption. These findings highlight the potential of heterogeneous AIMC architectures to enhance the efficiency and scalability of ML applications.
