---
title: "Dense Associative Memory for Resonator Networks"
image: "/images/positions/dam-resonator-networks-banner.jpg"
image_credit: "Photo based on Langenegger et al. (2023)."
tags:
  - Master's project
  - PhD project
---

Resonator networks solve combinatorial factorization problems by iteratively refining candidate factors in superposition, and have shown strong performance for decoding compositional vector-symbolic representations[¹](#frady2020resonator).
At the same time, Dense Associative Memories (modern Hopfield networks) provide attractor dynamics with significantly larger storage capacity than classical Hopfield models, suggesting a promising substrate for pattern completion inside resonator-style inference loops.

In this project, we will explore Dense Associative Memory modules for resonator networks and compare them against classical Hopfield-based modules in terms of convergence behavior, capacity, robustness to noise, and retrieval quality, following the resonator-network analysis by Kent et al.[²](#kent2019resonator).
We will first benchmark both approaches in software, then map the most promising variants to phase-change-memory in-memory computing (IMC) hardware, where massively parallel matrix-vector operations can accelerate recurrent updates.

Building on prior demonstrations of Hopfield-style factorization on IMC hardware[³](#langenegger2023factorization), we will study how analog non-idealities (device variability, conductance drift, and read noise) affect -- and ideally improve -- attractor convergence and exploration also for Dense Associative Memories.
The goal is to identify energy functions and update rules that remain stable under realistic hardware constraints while improving factorization accuracy and efficiency.

This work bridges modern associative memory theory, resonator-network computation, and mixed-signal IMC systems[⁴](#legallo2023hermes), and aims to establish when Dense Associative Memory offers measurable advantages over classical Hopfield dynamics for practical factorization tasks.

### Further reads

<a name="frady2020resonator">¹</a> Frady, E. P., Kent, S., Olshausen, B. A., & Sommer, F. T. (2020). *Resonator networks for factoring distributed representations of data structures*. Neural Computation.

<a name="kent2019resonator">²</a> Kent, S. J., Frady, E. P., Sommer, F. T., & Olshausen, B. A. (2019). *Resonator Networks outperform optimization methods at solving high-dimensional vector factorization*. arXiv:1906.11684.

<a name="langenegger2023factorization">³</a> Langenegger, J., Karunaratne, G., Hersche, M., Benini, L., Sebastian, A., & Rahimi, A. (2023). *In-memory factorization of holographic perceptual representations*. Nature Nanotechnology, 18(5), 479-485.

<a name="legallo2023hermes">⁴</a> Le Gallo, M., Khaddam-Aljameh, R., Stanisavljevic, M., Vasilopoulos, A., Kersting, B., Dazzi, M., ... & Sebastian, A. (2023). *A 64-core mixed-signal in-memory compute chip based on phase-change memory for deep neural network inference*. Nature Electronics, 6(9), 680-693.
