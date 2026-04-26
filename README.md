# Page Table Toy: RISC-V Virtual Address Translation Visualizer

Page Table Toy is a technical utility for simulating and interacting with RISC-V virtual address translation mechanisms.

**Visit [https://tim-wt-hsu.github.io/page-table-toy/](https://tim-wt-hsu.github.io/page-table-toy/) to play around with the live tool.**

It provides modeling of Sv32 and Sv39 paging modes, enabling precise inspection and manipulation of the translation path from Virtual Addresses (VA) to Physical Addresses (PA).

## Core Capabilities

- **Multi-Mode Support**: Support for Sv32 (2-level) and Sv39 (3-level) paging schemes.
- **Hierarchical Navigation**: Interactive exploration of the page table tree with detailed inspection of Next-level Table entries and Leaf Page Table Entries (PTEs).
- **Address Translation Walk**: Simulation of virtual address translation, illustrating index extraction and physical mapping at each level.
- **Table and Entry Modification**: Tools for manual PTE updates and automated page table relocation with pointer synchronization.
- **Memory Viewport**: A low-level visualization of the physical address space with multi-scale zooming and coordinate tracking.

## Technical Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Iconography**: Lucide React
- **Build Tool**: Vite

## Operational Guide

1. **Initialization**: Utilize the "Load Example" function to populate a standard hierarchical structure.
2. **Navigation**: 
   - Interact with Next-level Table entries to traverse the hierarchy.
   - Utilize the edit interface to modify status flags (V, R, W, X, A, D) or Physical Page Numbers (PPN).
3. **Translation Simulation**: Input a hexadecimal virtual address to initiate a formal translation walk.
4. **Relocation**: Access the Table Physical Address interface to relocate tables; the tool ensures all parent references are updated according to the architecture specification.

## Deployment and Local Execution

Ensure a standard [Node.js](https://nodejs.org/) environment is available:

```bash
# Clone the repository
git clone https://github.com/your-username/page-table-toy.git

# Enter project root
cd page-table-toy

# Install dependencies
npm install

# Execute development server
npm run dev
```

---
*An interactive learning tool for RISC-V Computer Architecture*
