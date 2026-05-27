---
title: "Demonstrating Dense Associative Memory on an In-Memory Computing prototype"
image: "/images/positions/dam-on-hermes-banner.jpg"
image_credit: "Photo based on Hoover et al. (2025)"
---

Hopfield networks are enjoying renewed interest as simple dynamical systems that can store memories as attractors and recover them from noisy or incomplete inputs.
Dense Associative Memories – or "modern Hopfield networks" – build on classical Hopfield networks and replace pairwise interaction with more expressive energy functions, leading to much larger storage capacity and richer attractor landscapes.
Both forms of associative memory map naturally to in-memory computing (IMC): the network weights are stored in often novel non-volatile memory devices, and the dominant operation is the parallel matrix-vector multiplication performed directly on the array.

While plain Hopfield networks have already been demonstrated[¹](#langenegger2023factorization) on our in-memory computing prototype[²](#legallo2023hermes), contemporary forms of associative memory could dramatically improve recall capacity and retrieval latency.
In this project, we will investigate how Dense Associative Memories can be mapped to phase-change-memory-based IMC hardware, how analog noise and device variability affect the resulting dynamics, and how the choice of energy function shapes the memory landscape and recall process.

Beyond associative recall, these models connect to resonator networks for factorization and to modern attention mechanisms, making them an interesting bridge between physics-inspired computation, emerging memory hardware, and machine learning.

### Further reads

<a name="langenegger2023factorization">¹</a> Langenegger, J., Karunaratne, G., Hersche, M., Benini, L., Sebastian, A., & Rahimi, A. (2023). *In-memory factorization of holographic perceptual representations*. Nature Nanotechnology, 18(5), 479-485.

<a name="legallo2023hermes">²</a> Le Gallo, M., Khaddam-Aljameh, R., Stanisavljevic, M., Vasilopoulos, A., Kersting, B., Dazzi, M., ... & Sebastian, A. (2023). *A 64-core mixed-signal in-memory compute chip based on phase-change memory for deep neural network inference*. Nature Electronics, 6(9), 680-693.
