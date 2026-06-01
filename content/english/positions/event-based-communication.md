---
title: "Time-based communication for In-Memory Computing"
image: "/images/positions/event-based-communication.jpg"
image_credit: "Photo by Yannik Stradmann"
tags:
  - Master's project
  - PhD project
---

In the nervous system, neurons communicate through spikes.
These spikes are elicited whenever a neuron's membrane crosses an intrinsic threshold and in turn trigger a post-synaptic response on the receiving end.
This event-based and temporally sparse nature of spiking communication is often associated with inherent energy efficiency gains and represents one of the core pillars of neuromorphic computation<a href="#göltz2024fast">¹</a><a href="#stanojevic2024highperformance">²</a>.

In contrast to spiking neural networks, where computation and communication are inherently interlinked, more traditional approaches – such as multi-layer perceptrons or convolutional neural networks – don't consider the notion of time and thus can not directly exploit temporal communication schemes.
Neural network accelerator chips – whether digital or relying on analog in-memory computing – thus typically encode and communicate layer activations through straight-forward binary channels.

In this project, we aim to systematically investigate the implications of time-based communication from the perspectives of information theory and physics.
We set out to understand the duality of computation and communication and attempt to separate these two concerns.
In this regard, we build on first results focusing on digital computation<a href="#kossel2025digital">³</a> and expand into the realm of analog computation.
Finally, we look out for concrete gains in inter-core communication to reduce latency and the energy footprint of IMC-based machine learning accelerators.


### Further reads

<a name="göltz2024fast">¹</a> Göltz, J., Kriener, L., Baumbach, A., Billaudelle, S., Breitwieser, O., Cramer, B., ... & Petrovici, M. A. (2021). Fast and energy-efficient neuromorphic deep learning with first-spike times. Nature machine intelligence, 3(9), 823-835.

<a name="stanojevic2024highperformance">²</a> Stanojevic, A., Woźniak, S., Bellec, G., Cherubini, G., Pantazi, A., & Gerstner, W. (2024). High-performance deep spiking neural networks with 0.3 spikes per neuron. Nature Communications, 15(1), 6793.

<a name="kossel2025digital">³</a> Kossel, M., Cherubini, G., Brändli, M., Alfonso, V. M. G., Woźniak, S., Francese, P. A., ... & Pantazi, A. (2025, December). Digital SNN in 5 nm FinFET CMOS with latency-reducing hybrid spiking scheme operated at 2.6 GHz. In 2025 37th International Conference on Microelectronics (ICM) (pp. 1-6). IEEE.
