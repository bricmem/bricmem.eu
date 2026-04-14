---
title: "Efficient scaling of large language models with mixture of experts and 3D analog in-memory computing"
authors:
  - "Julian Büchel"
  - "Athanasios Vasilopoulos"
  - "William Andrew Simon"
  - "Irem Boybat"
  - "HsinYu Tsai"
  - "Geoffrey W. Burr"
  - "Hernan Castro"
  - "Bill Filipiak"
  - "Manuel Le Gallo"
  - "Abbas Rahimi"
  - "Vijay Narayanan"
  - "Abu Sebastian"
journal: "Nature Computational Science"
year: 2025
date: 2025-01-01
doi: "10.1038/s43588-024-00753-x"
source_url: "https://doi.org/10.1038/s43588-024-00753-x"
volume: "5"
issue: "1"
pages: "13-26"
publisher: "Springer Science and Business Media LLC"
priority: 3
tags: ["publications"]
draft: false
---

Large language models (LLMs), with their remarkable generative capacities, have greatly impacted a range of fields, but they face scalability challenges due to their large parameter counts, which result in high costs for training and inference. The trend of increasing model sizes is exacerbating these challenges, particularly in terms of memory footprint, latency and energy consumption. Here we explore the deployment of ‘mixture of experts’ (MoEs) networks—networks that use conditional computing to keep computational demands low despite having many parameters—on three-dimensional (3D) non-volatile memory (NVM)-based analog in-memory computing (AIMC) hardware. When combined with the MoE architecture, this hardware, utilizing stacked NVM devices arranged in a crossbar array, offers a solution to the parameter-fetching bottleneck typical in traditional models deployed on conventional von-Neumann-based architectures. By simulating the deployment of MoEs on an abstract 3D AIMC system, we demonstrate that, due to their conditional compute mechanism, MoEs are inherently better suited to this hardware than conventional, dense model architectures. Our findings suggest that MoEs, in conjunction with emerging 3D NVM-based AIMC, can substantially reduce the inference costs of state-of-the-art LLMs, making them more accessible and energy-efficient.
