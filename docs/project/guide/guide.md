# Virtual Memory Structure Guide

## Current Structure

```
+----------------------------------+
|           index.js               |  <- entry point
+----------------------------------+
|        elementManager            |  <- single element (singleton)
+----------------------------------+
|        elementService            |  <- pure function (stateless)
+----------------------------------+
|          element                 |  <- data structure (literal)
+----------------------------------+
```

### Current Limitations

| Issue | Description |
|-------|-------------|
| Single object only | elementManager has only one element |
| No cache | create new every time |
| No memory management | no GC concept |

---

## Target Structure: Add VirtualMemory Layer

```
+----------------------------------+
|           index.js               |  <- entry point
+----------------------------------+
|        VirtualMemory             |  <- [NEW] Pool + Cache + GC
+----------------------------------+
|        elementManager            |  <- change to Factory pattern
+----------------------------------+
|        elementService            |  <- keep (pure function)
+----------------------------------+
|          element                 |  <- keep (data structure)
+----------------------------------+
```

---

## New Layers Detail

### 1. VirtualMemory

**Role**: Top-level memory manager

**Responsibilities**:
- Node Pool management
- Cache management
- Garbage Collection (GC)

**Structure**:
```
VirtualMemory
|
+-- pool: {}           <- all nodes storage (key: address)
+-- cache: {}          <- frequently used nodes
+-- cacheOrder: []     <- LRU order tracking
+-- maxCacheSize: n    <- max cache size
|
+-- allocate()         <- allocate new memory (create node)
+-- free(address)      <- free memory
+-- read(address)      <- read memory (cache first)
+-- write(address, v)  <- write memory
+-- gc()               <- run garbage collection
```

### 2. Cache Layer

**Role**: Fast lookup for frequently accessed nodes

**Strategy**: LRU (Least Recently Used)

```
+--------------------------------------------------+
|                  LRU Cache Flow                   |
+--------------------------------------------------+
|  1. read(addr) called                            |
|  2. if in cache -> return + update order         |
|  3. if not in cache -> get from pool + add cache |
|  4. if cache full -> remove oldest item          |
+--------------------------------------------------+
```

### 3. Node (Memory Block)

**Role**: Extended element as memory block

**Structure**:
```
Node {
    address: "0x001"    <- unique address (was key)
    value: any          <- stored value
    refCount: 0         <- reference count (for GC)
    createdAt: timestamp
    lastAccess: timestamp
}
```

---

## Directory Structure

```
js/es5/section2-3/object/
|
+-- literal/
|   +-- element.js              <- keep
|   +-- memory/
|       +-- elementManager.js   <- change to Factory
|
+-- function/
|   +-- elementService.js       <- keep
|
+-- [NEW] memory/
    +-- virtualMemory.js        <- memory manager
    +-- cache.js                <- LRU cache
    +-- node.js                 <- node structure
    +-- gc.js                   <- garbage collector
```

---

## Memory Flow Diagram

```
[Client]
    |
    v
+-------------------+
|   VirtualMemory   |
+-------------------+
    |
    +---> allocate() ---> elementManager.create()
    |                          |
    |                          v
    |                     elementService.create()
    |                          |
    |                          v
    |                     Node created (address assigned)
    |                          |
    |                          v
    +---> save to pool <-------+
    |
    +---> add to cache (LRU)
    |
    v
[return: address]
```

---

## Implementation Steps

### Step 1: Define Node structure
- Create Node literal extending element
- Add address, refCount, timestamp

### Step 2: Implement Cache
- LRU algorithm
- Use Object + Array (ES5 compatible)

### Step 3: Implement VirtualMemory
- Pool management
- allocate, free, read, write methods

### Step 4: Implement GC
- refCount based collection
- or timestamp based expiration

### Step 5: Refactor elementManager
- Singleton -> Factory pattern
- Connect with VirtualMemory

---

## ES5 Memory Management Methods

| Method | Description | ES5 |
|--------|-------------|-----|
| Object | key-value storage | O |
| Array | order tracking (LRU) | O |
| WeakMap | GC friendly reference | X (ES6) |
| Closure | private state | O |

**Best for ES5**: Object + Array + Closure

```
+--------------------------------------------------+
|              ES5 Memory Pattern                   |
+--------------------------------------------------+
|  var pool = {};         <- node storage          |
|  var cache = {};        <- cache storage         |
|  var order = [];        <- LRU order             |
|                                                   |
|  Use Closure for private state                   |
|  Use refCount for GC target detection            |
+--------------------------------------------------+
```

---

## Address System Design

```
Format: "0x" + timestamp + "_" + random

Example:
- 0x17328456789_a1b2
- 0x17328456790_c3d4

+--------------------------------------------------+
|                 Address Structure                 |
+--------------------------------------------------+
|  0x       | timestamp     | _ | random           |
|  prefix   | created time  |   | collision avoid  |
+--------------------------------------------------+
```

---

## Heap View

```
+--------------------------------------------------+
|                    JS Heap                        |
+--------------------------------------------------+
|                                                   |
|  VirtualMemory (0xVM001)                         |
|  +-- pool: { ... }  ----+                        |
|  +-- cache: { ... } ----|---> same Node ref      |
|                         |                        |
|  Node (0x001) <---------+                        |
|  +-- address: "0x001"                            |
|  +-- value: "Tester"                             |
|  +-- refCount: 2        <- pool + cache ref      |
|                                                   |
+--------------------------------------------------+
```

---

## Next Steps

1. Define node.js literal first
2. Implement cache.js LRU
3. Integrate virtualMemory.js
4. Refactor elementManager.js to Factory pattern
