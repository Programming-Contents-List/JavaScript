# Layer Architecture Patterns

> 다양한 Layer 구조와 Manager 패턴에 대한 종합 가이드

## 목차
1. [기본 Layer 구조](#1-기본-layer-구조)
2. [Manager 패턴 종류](#2-manager-패턴-종류)
3. [디렉토리 구조 제안](#3-디렉토리-구조-제안)
4. [실전 예제 코드](#4-실전-예제-코드)
5. [패턴 선택 가이드](#5-패턴-선택-가이드)

---

## 1. 기본 Layer 구조

### 1.1 표준 Layer (Linear Architecture)

**구조:**
> 현재 구조는 잘못되어 있다. 현재 구조와 맞지 않다.
```
View/Hook → Service → Manager → Object
```

**특징:**
- 단방향 의존성
- 각 Layer는 바로 아래 Layer만 호출
- 가장 단순하고 이해하기 쉬움

**사용 시기:**
- 소규모 프로젝트
- 단순한 CRUD 애플리케이션
- 빠른 프로토타이핑

**장점:**
- ✅ 학습 곡선이 낮음
- ✅ 구조가 명확함
- ✅ 디버깅이 쉬움

**단점:**
- ❌ 복잡한 비즈니스 로직 처리 어려움
- ❌ 확장성 제한
- ❌ 책임이 모호해질 수 있음

**예제:**
```javascript
// View
function displayUser() {
    var user = userService.fetchUser(1);
    console.log(user);
}

// Service
var userService = {
    fetchUser: function(id) {
        return userManager.getUser(id);
    }
};

// Manager
var userManager = {
    users: {},
    getUser: function(id) {
        if (!this.users[id]) {
            this.users[id] = Object.create(userObject);
        }
        return this.users[id];
    }
};

// Object
var userObject = {
    id: null,
    name: null
};
```

---

### 1.2 Flexible Layer (Direct Service Access)

**구조:**
```
View/Hook ─┬→ Service → Object
           └→ Manager → Service → Object
```

**특징:**
- View는 Service와 Manager 모두에 접근 가능
- 상황에 따라 경로 선택
- 실무에서 가장 많이 사용

**사용 시기:**
- 중규모 프로젝트
- 일부는 단순, 일부는 복잡한 로직
- 유연성이 필요한 경우

**장점:**
- ✅ 단순한 작업은 빠르게 처리
- ✅ 복잡한 작업은 Manager로 관리
- ✅ 불필요한 추상화 방지

**단점:**
- ❌ 일관성 부족 가능성
- ❌ 팀 컨벤션 필요
- ❌ 잘못 사용하면 스파게티 코드

**선택 기준:**

| 작업 유형 | 호출 대상 | 이유 |
|-----------|-----------|------|
| 단순 CRUD | Service 직접 | 생명주기 관리 불필요 |
| 싱글톤 관리 | Manager | 전역 상태 필요 |
| 비즈니스 규칙 | Manager | 검증, 정책 필요 |
| 여러 Service 조합 | Manager | 트랜잭션 관리 |

**예제:**
```javascript
// View - 단순한 경우: Service 직접 호출
function createTempUser(name) {
    var user = userService.create(name);
    return user;
}

// View - 복잡한 경우: Manager 호출
function loginUser(username, password) {
    // Manager가 검증, 세션 관리, 권한 체크
    var result = authManager.login(username, password);
    return result;
}
```

---

### 1.3 Sandwich Layer (햄버거 구조)

**구조:**
```
View/Hook
    ↓
┌─────────────────┐
│ Manager (상위)  │  ← Policy: 비즈니스 규칙
└─────────────────┘
    ↓
┌─────────────────┐
│ Service (중앙)  │  ← Mechanism: 실행 로직
└─────────────────┘
    ↓
┌─────────────────┐
│ Manager (하위)  │  ← State: 생명주기/상태
└─────────────────┘
    ↓
┌─────────────────┐
│ Object          │
└─────────────────┘
```

**특징:**
- Service를 중심으로 상/하 Manager로 감싸는 구조
- 관심사의 3단 분리 (Policy-Mechanism-State)
- 가장 복잡하지만 가장 명확한 책임 분리

**사용 시기:**
- 대규모 프로젝트
- 복잡한 비즈니스 도메인
- 높은 유지보수성 필요
- 여러 팀이 협업

**장점:**
- ✅ 책임이 극도로 명확함
- ✅ 각 Layer 독립적 변경 가능
- ✅ 테스트 용이성 최고
- ✅ 확장성 최고

**단점:**
- ❌ 초기 설계 비용 높음
- ❌ 학습 곡선 높음
- ❌ 과도한 추상화 가능성
- ❌ 작은 프로젝트엔 오버엔지니어링

**Layer별 책임:**

| Layer | 책임 | 질문 | 예시 |
|-------|------|------|------|
| 상위 Manager | Policy | "언제?", "왜?" | 권한 체크, 검증, 규칙 |
| Service | Mechanism | "무엇을?", "어떻게?" | 데이터 변환, 알고리즘 |
| 하위 Manager | State | "어디에?", "어느 것?" | 생명주기, 캐싱, 저장 |
| Object | Structure | "무엇?" | 데이터 구조 정의 |

**예제:**
```javascript
// 상위 Manager: 비즈니스 규칙
var elementBusinessManager = {
    update: function(key, value) {
        // 검증
        if (!this.validateInput(key, value)) {
            return { error: "Invalid input" };
        }

        // 권한 체크
        if (!this.hasPermission()) {
            return { error: "No permission" };
        }

        // Service 호출
        var result = elementService.update(key, value);

        // 후처리
        if (result.success) {
            this.logActivity("updated");
        }

        return result;
    },

    validateInput: function(key, value) {
        return typeof key === 'string' && value !== null;
    },

    hasPermission: function() {
        return true; // 실제로는 권한 체크
    },

    logActivity: function(action) {
        console.log("Activity:", action);
    }
};

// Service: 데이터 조작
var elementService = {
    update: function(key, value) {
        // 하위 Manager에서 element 가져오기
        var element = elementStateManager.get();

        if (!element) {
            return { success: false, error: "No element" };
        }

        // 데이터 조작
        element.key = key;
        element.value = value;

        // 하위 Manager에게 상태 변경 알림
        elementStateManager.markModified();

        return { success: true, data: element };
    }
};

// 하위 Manager: 상태 관리
var elementStateManager = {
    element: null,
    isModified: false,

    get: function() {
        if (!this.element) {
            this.initialize();
        }
        return this.element;
    },

    initialize: function() {
        if (this.element) return;
        this.element = Object.create(elementObject);
    },

    markModified: function() {
        this.isModified = true;
    },

    destroy: function() {
        this.element = null;
        this.isModified = false;
    }
};

// Object
var elementObject = {
    key: null,
    value: null
};
```

---

## 2. Manager 패턴 종류

### 2.1 단일 Manager (Single Manager)

**구조:**
```
View → Manager → Service → Object
```

**특징:**
- 하나의 Manager가 모든 책임
- 가장 단순한 Manager 패턴

**사용 시기:**
- 관리할 객체가 1-2개
- 비즈니스 로직이 단순
- 생명주기만 관리하면 되는 경우

**예제:**
```javascript
var elementManager = {
    element: null,

    initialize: function() {
        if (this.element) {
            console.warn("already initialized");
            return this.element;
        }
        this.element = elementService.create();
        return this.element;
    },

    update: function(key, value) {
        if (!this.element) {
            console.error("not initialized");
            return;
        }
        return elementService.update(this.element, key, value);
    },

    get: function() {
        return this.element;
    },

    destroy: function() {
        this.element = null;
    }
};
```

---

### 2.2 계층적 Manager (Hierarchical Manager)

**구조:**
```
View
  ↓
appManager (최상위)
  ↓
  ├─→ userManager
  ├─→ configManager
  └─→ elementManager
        ↓
        Service
```

**특징:**
- Manager가 다른 Manager를 관리
- 트리 구조
- Composite 패턴과 유사

**사용 시기:**
- 여러 도메인 관리
- 전체 앱 상태 관리
- 복잡한 초기화 순서

**예제:**
```javascript
// 최상위 Manager
var appManager = {
    config: null,
    user: null,
    elements: null,

    initialize: function() {
        // 순서대로 초기화
        this.config = configManager.initialize();
        this.user = userManager.initialize();
        this.elements = elementManager.initialize();

        return {
            config: this.config,
            user: this.user,
            elements: this.elements
        };
    },

    reset: function() {
        elementManager.destroy();
        userManager.logout();
        configManager.reset();
    },

    getState: function() {
        return {
            config: configManager.get(),
            user: userManager.get(),
            elements: elementManager.get()
        };
    }
};

// 하위 Manager들
var configManager = {
    config: null,
    initialize: function() { /* ... */ },
    reset: function() { /* ... */ }
};

var userManager = {
    currentUser: null,
    initialize: function() { /* ... */ },
    logout: function() { /* ... */ }
};

var elementManager = {
    element: null,
    initialize: function() { /* ... */ },
    destroy: function() { /* ... */ }
};
```

---

### 2.3 협력 Manager (Collaborative Manager)

**구조:**
```
View
  ↓
authManager ←──→ userManager
  ↓                ↓
authService    userService
```

**특징:**
- 같은 레벨의 Manager끼리 협력
- 상호 의존 관계
- Mediator 패턴과 유사

**사용 시기:**
- Manager 간 통신 필요
- 복잡한 비즈니스 프로세스
- 여러 도메인이 상호작용

**주의사항:**
- ⚠️ 순환 참조 주의
- ⚠️ 의존성 명확히 관리
- ⚠️ 과도한 결합 방지

**예제:**
```javascript
// Auth Manager
var authManager = {
    session: null,

    login: function(username, password) {
        // 검증
        if (!this.validate(username, password)) {
            return { error: "Invalid credentials" };
        }

        // 세션 생성
        this.session = authService.createSession(username, password);

        // 협력: userManager에게 사용자 로드 요청
        userManager.loadUser(this.session.userId);

        return { success: true, session: this.session };
    },

    logout: function() {
        authService.destroySession(this.session);

        // 협력: userManager에게 사용자 클리어 요청
        userManager.clearUser();

        this.session = null;
    }
};

// User Manager
var userManager = {
    currentUser: null,

    loadUser: function(userId) {
        this.currentUser = userService.fetch(userId);
        return this.currentUser;
    },

    clearUser: function() {
        this.currentUser = null;
    },

    updateProfile: function(data) {
        if (!this.currentUser) {
            console.error("No user logged in");
            return;
        }

        // 협력: authManager에게 권한 확인
        if (!authManager.hasPermission('profile.update')) {
            return { error: "No permission" };
        }

        return userService.update(this.currentUser.id, data);
    }
};
```

---

### 2.4 햄버거 Manager (Sandwich Manager)

**구조:**
```
View
  ↓
businessManager (상위 - Policy)
  ↓
Service (중앙 - Mechanism)
  ↓
stateManager (하위 - State)
  ↓
Object
```

**특징:**
- Service를 상/하 Manager로 감쌈
- 책임의 3단 분리
- 가장 명확한 책임 분리

**사용 시기:**
- 복잡한 비즈니스 로직
- 상태 관리와 규칙이 분리 필요
- 높은 테스트 용이성 필요

**Layer별 책임:**
- **상위 Manager (Policy)**: 검증, 권한, 규칙, 정책
- **Service (Mechanism)**: 데이터 변환, 알고리즘, 실행
- **하위 Manager (State)**: 생명주기, 캐싱, 저장, 싱글톤

**예제:**
```javascript
// 상위 Manager: Policy
var cartBusinessManager = {
    addItem: function(productId, quantity) {
        // 규칙 1: 수량 검증
        if (quantity <= 0 || quantity > 100) {
            return { error: "Invalid quantity" };
        }

        // 규칙 2: 재고 확인
        if (!this.checkInventory(productId, quantity)) {
            return { error: "Out of stock" };
        }

        // 규칙 3: 가격 정책
        var pricePolicy = this.getPricePolicy(productId, quantity);

        // Service 호출
        var result = cartService.addItem(productId, quantity, pricePolicy);

        // 후처리
        if (result.success) {
            this.notifyCartUpdated();
        }

        return result;
    },

    checkInventory: function(productId, quantity) {
        // 비즈니스 로직
        return true;
    },

    getPricePolicy: function(productId, quantity) {
        // 할인 정책 등
        return { discount: quantity >= 10 ? 0.1 : 0 };
    },

    notifyCartUpdated: function() {
        console.log("Cart updated");
    }
};

// Service: Mechanism
var cartService = {
    addItem: function(productId, quantity, pricePolicy) {
        // 하위 Manager에서 cart 가져오기
        var cart = cartStateManager.getCart();

        if (!cart) {
            return { success: false, error: "Cart not available" };
        }

        // 데이터 조작
        var existingItem = this.findItem(cart, productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: productId,
                quantity: quantity,
                discount: pricePolicy.discount
            });
        }

        // 하위 Manager에게 상태 변경 알림
        cartStateManager.markModified();

        return { success: true, cart: cart };
    },

    findItem: function(cart, productId) {
        for (var i = 0; i < cart.items.length; i++) {
            if (cart.items[i].productId === productId) {
                return cart.items[i];
            }
        }
        return null;
    }
};

// 하위 Manager: State
var cartStateManager = {
    cart: null,
    isModified: false,

    getCart: function() {
        if (!this.cart) {
            this.initialize();
        }
        return this.cart;
    },

    initialize: function() {
        if (this.cart) return;

        // localStorage에서 복구 시도
        var saved = localStorage.getItem('cart');
        if (saved) {
            this.cart = JSON.parse(saved);
        } else {
            this.cart = { items: [] };
        }
    },

    markModified: function() {
        this.isModified = true;
        this.persist();
    },

    persist: function() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    destroy: function() {
        this.cart = null;
        this.isModified = false;
        localStorage.removeItem('cart');
    }
};
```

---

## 3. 디렉토리 구조 제안

### 3.1 표준 구조 (Linear)

```
project/
├── view/
│   └── page.js
├── hook/
│   └── useElement.js
├── service/
│   └── elementService.js
├── manager/
│   └── elementManager.js
└── object/
    └── element.js
```

### 3.2 Flexible 구조 (Direct Service Access)

```
project/
├── view/
│   ├── simplePage.js       # Service 직접 호출
│   └── complexPage.js      # Manager 호출
├── hook/
│   ├── useSimpleData.js    # Service 직접
│   └── useComplexState.js  # Manager
├── service/
│   ├── elementService.js
│   └── userService.js
├── manager/
│   ├── authManager.js      # 복잡한 로직
│   └── configManager.js    # 싱글톤
└── object/
    ├── element.js
    └── user.js
```

### 3.3 Sandwich 구조 (햄버거)

```
project/
├── view/
│   └── page.js
├── manager/
│   ├── business/           # 상위 Manager (Policy)
│   │   ├── elementBusinessManager.js
│   │   └── cartBusinessManager.js
│   └── state/              # 하위 Manager (State)
│       ├── elementStateManager.js
│       └── cartStateManager.js
├── service/                # 중앙 (Mechanism)
│   ├── elementService.js
│   └── cartService.js
└── object/
    ├── element.js
    └── cart.js
```

### 3.4 Domain-based 구조 (FSD 스타일)

```
project/
├── features/
│   ├── authentication/
│   │   ├── view/
│   │   │   └── LoginPage.js
│   │   ├── manager/
│   │   │   ├── business/
│   │   │   │   └── authBusinessManager.js
│   │   │   └── state/
│   │   │       └── authStateManager.js
│   │   ├── service/
│   │   │   └── authService.js
│   │   └── object/
│   │       └── session.js
│   │
│   ├── cart/
│   │   ├── view/
│   │   ├── manager/
│   │   ├── service/
│   │   └── object/
│   │
│   └── user/
│       ├── view/
│       ├── manager/
│       ├── service/
│       └── object/
│
└── shared/                 # 공통 유틸
    ├── service/
    └── object/
```

---

## 4. 실전 예제 코드

### 4.1 E-commerce Checkout (햄버거 구조)

**비즈니스 요구사항:**
- 장바구니에서 주문 생성
- 재고 확인
- 결제 처리
- 주문 확정

**코드:**

```javascript
// ============================================
// 하위 Manager: State Management
// ============================================

// 장바구니 상태 관리
var cartStateManager = {
    cart: null,

    getCart: function() {
        if (!this.cart) {
            var saved = localStorage.getItem('cart');
            this.cart = saved ? JSON.parse(saved) : { items: [] };
        }
        return this.cart;
    },

    persist: function() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    clear: function() {
        this.cart = { items: [] };
        localStorage.removeItem('cart');
    }
};

// 주문 상태 관리
var orderStateManager = {
    orders: {},

    save: function(order) {
        this.orders[order.id] = order;
        // DB 저장 로직
    },

    get: function(orderId) {
        return this.orders[orderId];
    }
};

// 재고 상태 관리
var inventoryStateManager = {
    inventory: {},

    load: function() {
        // API에서 재고 로드
        return this.inventory;
    },

    decrease: function(productId, quantity) {
        if (this.inventory[productId]) {
            this.inventory[productId] -= quantity;
        }
    }
};

// ============================================
// Service: Mechanism
// ============================================

var checkoutService = {
    // 장바구니 → 주문 변환
    createOrder: function() {
        var cart = cartStateManager.getCart();

        var order = {
            id: this.generateOrderId(),
            items: cart.items.map(function(item) {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                };
            }),
            total: this.calculateTotal(cart.items),
            status: 'pending',
            createdAt: Date.now()
        };

        return order;
    },

    generateOrderId: function() {
        return 'ORD-' + Date.now();
    },

    calculateTotal: function(items) {
        return items.reduce(function(sum, item) {
            return sum + (item.price * item.quantity);
        }, 0);
    }
};

var inventoryService = {
    // 재고 확인
    checkAvailability: function(order) {
        var inventory = inventoryStateManager.load();

        for (var i = 0; i < order.items.length; i++) {
            var item = order.items[i];
            var available = inventory[item.productId] || 0;

            if (available < item.quantity) {
                return {
                    available: false,
                    productId: item.productId,
                    requested: item.quantity,
                    available: available
                };
            }
        }

        return { available: true };
    },

    // 재고 감소
    decreaseStock: function(order) {
        for (var i = 0; i < order.items.length; i++) {
            var item = order.items[i];
            inventoryStateManager.decrease(item.productId, item.quantity);
        }
    }
};

var paymentService = {
    // 결제 처리
    process: function(order, paymentMethod) {
        // 실제로는 PG사 API 호출
        console.log('Processing payment for order:', order.id);

        // 시뮬레이션
        var success = Math.random() > 0.1; // 90% 성공

        return {
            success: success,
            transactionId: success ? 'TXN-' + Date.now() : null,
            error: success ? null : 'Payment failed'
        };
    }
};

// ============================================
// 상위 Manager: Business Logic (Policy)
// ============================================

var checkoutBusinessManager = {
    processCheckout: function(paymentMethod) {
        console.log('=== Starting Checkout Process ===');

        // 1. 비즈니스 규칙: 장바구니 검증
        var cart = cartStateManager.getCart();
        if (!cart.items || cart.items.length === 0) {
            return {
                success: false,
                error: 'Cart is empty'
            };
        }

        // 2. 주문 생성
        console.log('Creating order...');
        var order = checkoutService.createOrder();

        // 3. 비즈니스 규칙: 재고 확인
        console.log('Checking inventory...');
        var inventoryCheck = inventoryService.checkAvailability(order);
        if (!inventoryCheck.available) {
            return {
                success: false,
                error: 'Out of stock',
                details: inventoryCheck
            };
        }

        // 4. 비즈니스 규칙: 최소 주문 금액
        if (order.total < 10000) {
            return {
                success: false,
                error: 'Minimum order amount is 10,000'
            };
        }

        // 5. 결제 처리
        console.log('Processing payment...');
        var payment = paymentService.process(order, paymentMethod);

        if (!payment.success) {
            return {
                success: false,
                error: payment.error
            };
        }

        // 6. 주문 확정
        console.log('Confirming order...');
        order.status = 'confirmed';
        order.paymentId = payment.transactionId;
        orderStateManager.save(order);

        // 7. 재고 감소
        inventoryService.decreaseStock(order);

        // 8. 장바구니 클리어
        cartStateManager.clear();

        // 9. 후처리
        this.sendConfirmationEmail(order);
        this.logOrder(order);

        console.log('=== Checkout Complete ===');

        return {
            success: true,
            order: order,
            payment: payment
        };
    },

    sendConfirmationEmail: function(order) {
        console.log('Sending confirmation email for order:', order.id);
    },

    logOrder: function(order) {
        console.log('Logging order:', order.id);
    }
};

// ============================================
// View: 사용
// ============================================

// 장바구니에 상품 추가 (테스트 데이터)
cartStateManager.cart = {
    items: [
        { productId: 'P1', quantity: 2, price: 15000 },
        { productId: 'P2', quantity: 1, price: 25000 }
    ]
};
cartStateManager.persist();

// 재고 데이터 (테스트)
inventoryStateManager.inventory = {
    'P1': 10,
    'P2': 5
};

// 체크아웃 실행
function handleCheckout() {
    var result = checkoutBusinessManager.processCheckout('credit-card');

    if (result.success) {
        console.log('Order placed successfully!');
        console.log('Order ID:', result.order.id);
        console.log('Total:', result.order.total);
    } else {
        console.error('Checkout failed:', result.error);
    }
}

// 실행
handleCheckout();
```

---

### 4.2 Authentication System (협력 Manager)

```javascript
// ============================================
// Service Layer
// ============================================

var authService = {
    createSession: function(username, password) {
        // API 호출 시뮬레이션
        return {
            id: 'SESSION-' + Date.now(),
            userId: 'USER-' + username,
            token: 'TOKEN-' + Math.random(),
            expiresAt: Date.now() + 3600000
        };
    },

    destroySession: function(session) {
        console.log('Session destroyed:', session.id);
    },

    validateToken: function(token) {
        return token && token.startsWith('TOKEN-');
    }
};

var userService = {
    fetch: function(userId) {
        // API 호출 시뮬레이션
        return {
            id: userId,
            name: 'User ' + userId,
            email: userId + '@example.com',
            role: 'user'
        };
    },

    update: function(userId, data) {
        console.log('Updating user:', userId, data);
        return { success: true };
    }
};

var permissionService = {
    getUserPermissions: function(userId) {
        // 실제로는 DB/API에서 조회
        return ['profile.read', 'profile.update', 'cart.manage'];
    },

    hasPermission: function(permissions, requiredPermission) {
        return permissions.indexOf(requiredPermission) !== -1;
    }
};

// ============================================
// Manager Layer (협력 관계)
// ============================================

var authManager = {
    session: null,

    login: function(username, password) {
        // 검증
        if (!username || !password) {
            return { success: false, error: 'Invalid credentials' };
        }

        // 세션 생성
        this.session = authService.createSession(username, password);

        // ✅ 협력: userManager에게 사용자 로드 요청
        var user = userManager.loadUser(this.session.userId);

        // ✅ 협력: permissionManager에게 권한 로드 요청
        permissionManager.loadPermissions(this.session.userId);

        console.log('Login successful:', user.name);

        return {
            success: true,
            session: this.session,
            user: user
        };
    },

    logout: function() {
        if (!this.session) return;

        authService.destroySession(this.session);

        // ✅ 협력: 다른 Manager들에게 정리 요청
        userManager.clearUser();
        permissionManager.clearPermissions();

        this.session = null;
        console.log('Logout successful');
    },

    isAuthenticated: function() {
        if (!this.session) return false;
        return authService.validateToken(this.session.token);
    },

    getSession: function() {
        return this.session;
    }
};

var userManager = {
    currentUser: null,

    loadUser: function(userId) {
        if (this.currentUser && this.currentUser.id === userId) {
            return this.currentUser;
        }

        this.currentUser = userService.fetch(userId);
        return this.currentUser;
    },

    updateProfile: function(data) {
        if (!this.currentUser) {
            console.error('No user logged in');
            return { success: false, error: 'Not authenticated' };
        }

        // ✅ 협력: authManager에게 인증 확인
        if (!authManager.isAuthenticated()) {
            return { success: false, error: 'Session expired' };
        }

        // ✅ 협력: permissionManager에게 권한 확인
        if (!permissionManager.hasPermission('profile.update')) {
            return { success: false, error: 'No permission' };
        }

        var result = userService.update(this.currentUser.id, data);

        if (result.success) {
            // 현재 사용자 정보 업데이트
            Object.assign(this.currentUser, data);
        }

        return result;
    },

    getCurrentUser: function() {
        return this.currentUser;
    },

    clearUser: function() {
        this.currentUser = null;
    }
};

var permissionManager = {
    permissions: [],

    loadPermissions: function(userId) {
        this.permissions = permissionService.getUserPermissions(userId);
        console.log('Permissions loaded:', this.permissions);
    },

    hasPermission: function(permission) {
        return permissionService.hasPermission(this.permissions, permission);
    },

    clearPermissions: function() {
        this.permissions = [];
    },

    getPermissions: function() {
        return this.permissions;
    }
};

// ============================================
// View: 사용 예제
// ============================================

console.log('=== Authentication Example ===\n');

// 1. 로그인
console.log('1. Login:');
var loginResult = authManager.login('john', 'password123');
console.log('Result:', loginResult.success ? 'Success' : 'Failed');
console.log('User:', loginResult.user.name);
console.log('Permissions:', permissionManager.getPermissions());
console.log('');

// 2. 프로필 업데이트
console.log('2. Update Profile:');
var updateResult = userManager.updateProfile({ name: 'John Doe' });
console.log('Result:', updateResult.success ? 'Success' : 'Failed');
console.log('Current User:', userManager.getCurrentUser().name);
console.log('');

// 3. 권한 없는 작업 시도
console.log('3. Try unauthorized action:');
var unauthorized = permissionManager.hasPermission('admin.delete');
console.log('Has admin permission:', unauthorized);
console.log('');

// 4. 로그아웃
console.log('4. Logout:');
authManager.logout();
console.log('Is authenticated:', authManager.isAuthenticated());
console.log('Current User:', userManager.getCurrentUser());
```

---

## 5. 패턴 선택 가이드

### 5.1 프로젝트 규모별 추천

| 프로젝트 규모 | 추천 패턴 | 이유 |
|--------------|-----------|------|
| 소규모 (< 10 파일) | 표준 Linear | 단순, 빠른 개발 |
| 중규모 (10-50 파일) | Flexible | 유연성, 실용성 |
| 대규모 (50+ 파일) | Sandwich | 명확한 책임, 유지보수 |
| 엔터프라이즈 | Domain-based + Sandwich | 확장성, 팀 협업 |

### 5.2 복잡도별 Manager 선택

| 복잡도 | Manager 패턴 | 예시 |
|--------|-------------|------|
| 단순 | 단일 Manager | 설정 관리, 캐시 |
| 중간 | 계층적 Manager | 앱 상태 관리 |
| 복잡 | 협력 Manager | 인증 + 권한 |
| 매우 복잡 | 햄버거 Manager | E-commerce 체크아웃 |

### 5.3 의사결정 플로우차트

```
시작
  ↓
프로젝트가 10개 미만의 파일인가?
  ├─ YES → 표준 Linear 구조 사용
  └─ NO
      ↓
      비즈니스 로직이 복잡한가?
        ├─ NO → Flexible 구조 사용
        └─ YES
            ↓
            여러 도메인이 있는가?
              ├─ NO → 햄버거 구조 사용
              └─ YES → Domain-based + 햄버거 구조 사용
```

### 5.4 안티패턴 (피해야 할 것들)

#### ❌ 1. God Manager
```javascript
// ❌ 나쁜 예: 모든 것을 하는 Manager
var godManager = {
    user: null,
    config: null,
    cart: null,
    orders: null,
    // ... 100개의 속성

    doEverything: function() {
        // 1000줄의 코드
    }
};
```

**해결책:** 책임별로 Manager 분리

#### ❌ 2. Manager Bypass
```javascript
// ❌ 나쁜 예: View가 Object 직접 조작
function updateView() {
    element.key = "newKey";  // Object 직접 조작!
}
```

**해결책:** 반드시 Service 거치기

#### ❌ 3. Circular Dependency
```javascript
// ❌ 나쁜 예: Manager 간 순환 참조
var managerA = {
    doSomething: function() {
        managerB.doOther();
    }
};

var managerB = {
    doOther: function() {
        managerA.doSomething();  // 순환!
    }
};
```

**해결책:** 상위 Manager로 조율하거나 Event 사용

#### ❌ 4. Leaky Abstraction
```javascript
// ❌ 나쁜 예: Manager가 구현 세부사항 노출
var manager = {
    getElement: function() {
        // Service의 내부 구현을 그대로 반환
        return elementService._internalCache.element;
    }
};
```

**해결책:** 인터페이스로 추상화

---

## 6. 마무리

### 핵심 원칙

1. **단일 책임 원칙**: 각 Layer는 하나의 책임만
2. **의존성 방향**: 항상 위에서 아래로
3. **캡슐화**: 내부 구현 숨기기
4. **적절한 추상화**: 과도하지도, 부족하지도 않게

### 실천 가이드

```javascript
// ✅ 좋은 Layer 구조의 체크리스트

// 1. Object는 순수한 데이터인가?
var element = { key: null, value: null };  // ✅

// 2. Service는 Object만 조작하는가?
var service = {
    update: function(element, key, value) {
        element.key = key;
        return element;
    }
};  // ✅

// 3. Manager는 생명주기/규칙만 관리하는가?
var manager = {
    element: null,
    initialize: function() {
        if (!this.element) {
            this.element = service.create();
        }
    }
};  // ✅

// 4. View는 구현 세부사항을 모르는가?
function view() {
    var element = manager.initialize();
    // element의 내부 구조를 모름
}  // ✅
```

### 다음 단계

1. 현재 프로젝트 분석
2. 적절한 패턴 선택
3. 점진적 리팩토링
4. 팀 컨벤션 문서화

---

**작성일**: 2025-10-29
**버전**: 1.0.0
**관련 문서**: section2-3-answers.md, generateElement.js
