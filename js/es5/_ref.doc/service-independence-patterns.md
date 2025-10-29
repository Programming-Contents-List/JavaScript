# Service 독립성 패턴

> Service가 Manager에 종속되지 않고 독립적으로 동작하는 5가지 패턴

## 목차
1. [문제 정의](#1-문제-정의)
2. [순수 함수 Service](#2-순수-함수-service)
3. [도메인 Service](#3-도메인-service)
4. [전략 패턴 Service](#4-전략-패턴-service)
5. [Event-Driven Service](#5-event-driven-service)
6. [Repository Pattern](#6-repository-pattern)
7. [패턴 비교 및 선택 가이드](#7-패턴-비교-및-선택-가이드)

---

## 1. 문제 정의

### 1.1 핵심 질문

> **"Service는 Manager에 종속되어야 하는가?"**
> **"Manager 없이는 Service가 의미가 없는가?"**

### 1.2 현재 구조의 문제

```javascript
// ❌ Service가 Manager의 "하인"처럼 보임
Manager → Service 호출
Manager → Service 호출
Manager → Service 호출

// Service는 Manager 없이 재사용 가능한가?
```

**우려 사항:**
- Service의 독립성 부족
- Manager 없이는 Service를 사용할 수 없음
- 재사용성 제한
- Service가 수동적 역할만 수행

### 1.3 해결 방향

**Service를 독립적인 모듈로 만들기:**
- Service가 Manager 없이도 완전히 동작
- 어디서든 재사용 가능
- Manager는 "선택적" 조율자
- Service가 중심, Manager가 보조

---

## 2. 순수 함수 Service

### 2.1 개념

Service를 **상태 없는 순수 함수 집합**으로 만들어 누구나 호출 가능하게

### 2.2 특징

- ✅ 완전히 독립적
- ✅ 입력 → 출력만 책임
- ✅ 누가 호출하든 동일하게 동작
- ✅ 테스트 용이성 최고
- ✅ 함수형 프로그래밍 스타일

### 2.3 코드 예시

```javascript
// ============================================
// Service: 순수 함수 (독립적)
// ============================================
var elementService = {
    // ✅ 상태를 갖지 않음, 누가 호출하든 OK
    create: function() {
        return { key: null, value: null };
    },

    update: function(element, key, value) {
        // 원본 변경 없이 새로운 객체 반환 (불변성)
        return {
            key: key,
            value: value
        };
    },

    validate: function(element) {
        return element.key !== null && element.value !== null;
    },

    serialize: function(element) {
        return JSON.stringify(element);
    },

    deserialize: function(json) {
        return JSON.parse(json);
    },

    clone: function(element) {
        return {
            key: element.key,
            value: element.value
        };
    },

    merge: function(element1, element2) {
        return {
            key: element2.key !== null ? element2.key : element1.key,
            value: element2.value !== null ? element2.value : element1.value
        };
    }
};

// ============================================
// 사용: 어디서든 호출 가능
// ============================================

// Manager에서 사용
var manager = {
    element: null,
    initialize: function() {
        this.element = elementService.create();  // ✅
    },
    update: function(key, value) {
        this.element = elementService.update(this.element, key, value);  // ✅
    }
};

// View에서 직접 사용
function createTempElement() {
    return elementService.create();  // ✅ Manager 불필요
}

// Hook에서 사용
function useElement(key, value) {
    var element = elementService.create();
    return elementService.update(element, key, value);  // ✅
}

// 테스트에서 사용
function testElement() {
    var element = elementService.create();
    element = elementService.update(element, 'testKey', 'testValue');
    var isValid = elementService.validate(element);  // ✅
    console.assert(isValid === true);
}

// 함수 조합 (Composition)
function createAndValidate(key, value) {
    var element = elementService.create();
    element = elementService.update(element, key, value);
    return elementService.validate(element);
}
```

### 2.4 장단점

**장점:**
- Service가 완전히 독립적
- 함수형 프로그래밍 스타일
- 불변성 보장
- 조합 가능 (Composable)
- 사이드 이펙트 없음

**단점:**
- 상태 관리 불가
- 매번 새 객체 생성 (메모리)
- 복잡한 비즈니스 로직 표현 어려움

### 2.5 사용 시기

- 함수형 프로그래밍 선호
- 불변성이 중요한 경우
- 상태 관리가 불필요한 경우
- 유틸리티 함수 라이브러리

---

## 3. 도메인 Service

### 3.1 개념

Service가 **비즈니스 로직의 핵심**이 되고, Manager는 선택적 래퍼

### 3.2 특징

- ✅ Service가 완전한 기능 제공
- ✅ Manager 없이도 동작
- ✅ Manager는 편의 기능 (싱글톤 관리 등)
- ✅ 실무에서 가장 실용적
- ✅ DDD(Domain-Driven Design) 원칙 준수

### 3.3 코드 예시

```javascript
// ============================================
// Service: 도메인 로직의 핵심 (독립적)
// ============================================
var cartService = {
    // ✅ Service가 모든 비즈니스 로직 포함
    addItem: function(cart, product, quantity) {
        // 검증
        if (quantity <= 0) {
            return { error: "Invalid quantity" };
        }

        if (quantity > 100) {
            return { error: "Maximum quantity is 100" };
        }

        // 중복 체크
        var existing = this.findItem(cart, product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.items.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }

        // 총액 계산
        cart.total = this.calculateTotal(cart);

        return { success: true, cart: cart };
    },

    removeItem: function(cart, productId) {
        var originalLength = cart.items.length;

        cart.items = cart.items.filter(function(item) {
            return item.productId !== productId;
        });

        if (cart.items.length === originalLength) {
            return { error: "Item not found" };
        }

        cart.total = this.calculateTotal(cart);
        return { success: true, cart: cart };
    },

    updateQuantity: function(cart, productId, quantity) {
        if (quantity <= 0) {
            return this.removeItem(cart, productId);
        }

        var item = this.findItem(cart, productId);
        if (!item) {
            return { error: "Item not found" };
        }

        item.quantity = quantity;
        cart.total = this.calculateTotal(cart);

        return { success: true, cart: cart };
    },

    calculateTotal: function(cart) {
        return cart.items.reduce(function(sum, item) {
            return sum + (item.price * item.quantity);
        }, 0);
    },

    applyDiscount: function(cart, discountRate) {
        if (discountRate < 0 || discountRate > 1) {
            return { error: "Invalid discount rate" };
        }

        cart.discount = discountRate;
        cart.total = this.calculateTotal(cart) * (1 - discountRate);

        return { success: true, cart: cart };
    },

    findItem: function(cart, productId) {
        for (var i = 0; i < cart.items.length; i++) {
            if (cart.items[i].productId === productId) {
                return cart.items[i];
            }
        }
        return null;
    },

    isEmpty: function(cart) {
        return !cart.items || cart.items.length === 0;
    },

    clear: function(cart) {
        cart.items = [];
        cart.total = 0;
        cart.discount = 0;
        return cart;
    }
};

// ============================================
// Manager: 선택적 래퍼 (생명주기만)
// ============================================
var cartManager = {
    cart: null,

    // ✅ Manager는 "언제" 호출할지만 결정
    initialize: function() {
        if (this.cart) return this.cart;
        this.cart = { items: [], total: 0, discount: 0 };
        return this.cart;
    },

    // Service에 위임 (pass-through)
    addItem: function(product, quantity) {
        if (!this.cart) this.initialize();
        return cartService.addItem(this.cart, product, quantity);
    },

    removeItem: function(productId) {
        if (!this.cart) return { error: "Cart not initialized" };
        return cartService.removeItem(this.cart, productId);
    },

    updateQuantity: function(productId, quantity) {
        if (!this.cart) return { error: "Cart not initialized" };
        return cartService.updateQuantity(this.cart, productId, quantity);
    },

    getCart: function() {
        if (!this.cart) this.initialize();
        return this.cart;
    },

    clear: function() {
        if (!this.cart) return;
        this.cart = cartService.clear(this.cart);
    }
};

// ============================================
// 사용: 양쪽 다 가능
// ============================================

// 1. Service 직접 사용 (Manager 불필요)
function calculateTempCart() {
    console.log('=== Service 직접 사용 ===');

    var tempCart = { items: [], total: 0, discount: 0 };

    var product1 = { id: 'P1', name: 'Product 1', price: 10000 };
    var product2 = { id: 'P2', name: 'Product 2', price: 20000 };

    cartService.addItem(tempCart, product1, 2);
    cartService.addItem(tempCart, product2, 1);
    cartService.applyDiscount(tempCart, 0.1);

    console.log('Temp cart total:', tempCart.total);
    return tempCart;  // ✅ Manager 없이 완전히 동작
}

// 2. Manager 사용 (전역 상태 관리 필요시)
function updateGlobalCart() {
    console.log('=== Manager 사용 ===');

    var product = { id: 'P1', name: 'Product 1', price: 10000 };

    cartManager.addItem(product, 2);

    var cart = cartManager.getCart();
    console.log('Global cart total:', cart.total);

    return cart;  // ✅ 싱글톤 관리
}

// 실행
calculateTempCart();  // Service 직접
updateGlobalCart();   // Manager 통해서
```

### 3.4 장단점

**장점:**
- Service가 독립적으로 완전한 기능
- Manager는 필요할 때만 사용
- 실무에서 가장 균형잡힌 접근
- DDD 원칙 준수
- 재사용성 높음

**단점:**
- Service가 복잡해질 수 있음
- 비즈니스 로직이 Service에 집중

### 3.5 사용 시기

- **대부분의 실무 프로젝트** ⭐ (추천)
- DDD 적용 시
- Service 재사용이 중요한 경우
- 비즈니스 로직이 복잡한 경우

---

## 4. 전략 패턴 Service

### 4.1 개념

Service를 **인터페이스**처럼 사용하고 여러 구현체 제공

### 4.2 특징

- ✅ 런타임에 구현체 변경 가능
- ✅ Service가 독립적 모듈
- ✅ Manager는 구현체 선택자
- ✅ 확장성 높음
- ✅ Strategy Pattern 적용

### 4.3 코드 예시

```javascript
// ============================================
// Service: 여러 구현체 (독립적)
// ============================================

// REST API 구현
var restStorageService = {
    save: function(key, data) {
        console.log('Saving to REST API:', key);
        // 실제 구현:
        // fetch('/api/save', {
        //     method: 'POST',
        //     body: JSON.stringify({ key: key, data: data })
        // })
        return { success: true, method: 'api' };
    },

    load: function(key) {
        console.log('Loading from REST API:', key);
        // fetch('/api/load/' + key)
        return {
            key: key,
            value: 'from API',
            method: 'api'
        };
    },

    delete: function(key) {
        console.log('Deleting from REST API:', key);
        return { success: true };
    },

    exists: function(key) {
        // API 호출로 존재 여부 확인
        return true;
    }
};

// LocalStorage 구현
var localStorageService = {
    save: function(key, data) {
        console.log('Saving to localStorage:', key);
        localStorage.setItem(key, JSON.stringify(data));
        return { success: true, method: 'local' };
    },

    load: function(key) {
        console.log('Loading from localStorage:', key);
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    delete: function(key) {
        console.log('Deleting from localStorage:', key);
        localStorage.removeItem(key);
        return { success: true };
    },

    exists: function(key) {
        return localStorage.getItem(key) !== null;
    }
};

// IndexedDB 구현
var indexedDBService = {
    db: null,

    init: function() {
        // indexedDB 초기화
        console.log('IndexedDB initialized');
    },

    save: function(key, data) {
        console.log('Saving to IndexedDB:', key);
        // indexedDB 저장 로직
        return { success: true, method: 'indexeddb' };
    },

    load: function(key) {
        console.log('Loading from IndexedDB:', key);
        // indexedDB 로드 로직
        return {
            key: key,
            value: 'from IndexedDB',
            method: 'indexeddb'
        };
    },

    delete: function(key) {
        console.log('Deleting from IndexedDB:', key);
        return { success: true };
    },

    exists: function(key) {
        // indexedDB 존재 여부 확인
        return true;
    }
};

// Memory 구현 (테스트용)
var memoryStorageService = {
    storage: {},

    save: function(key, data) {
        console.log('Saving to memory:', key);
        this.storage[key] = data;
        return { success: true, method: 'memory' };
    },

    load: function(key) {
        console.log('Loading from memory:', key);
        return this.storage[key] || null;
    },

    delete: function(key) {
        console.log('Deleting from memory:', key);
        delete this.storage[key];
        return { success: true };
    },

    exists: function(key) {
        return this.storage.hasOwnProperty(key);
    },

    clear: function() {
        this.storage = {};
    }
};

// ============================================
// Manager: Service 선택 및 조율
// ============================================
var storageManager = {
    service: null,
    currentType: null,

    // ✅ Manager가 Service를 선택
    initialize: function(storageType) {
        this.currentType = storageType || 'local';

        if (this.currentType === 'api') {
            this.service = restStorageService;
        } else if (this.currentType === 'indexeddb') {
            this.service = indexedDBService;
            this.service.init();
        } else if (this.currentType === 'memory') {
            this.service = memoryStorageService;
        } else {
            this.service = localStorageService;
        }

        console.log('Storage initialized:', this.currentType);
    },

    save: function(key, data) {
        if (!this.service) {
            this.initialize('local'); // 기본값
        }
        return this.service.save(key, data);
    },

    load: function(key) {
        if (!this.service) {
            this.initialize('local');
        }
        return this.service.load(key);
    },

    delete: function(key) {
        if (!this.service) {
            this.initialize('local');
        }
        return this.service.delete(key);
    },

    exists: function(key) {
        if (!this.service) {
            this.initialize('local');
        }
        return this.service.exists(key);
    },

    // ✅ 런타임에 Service 변경 가능
    switchStorage: function(storageType) {
        console.log('Switching storage from', this.currentType, 'to', storageType);
        this.initialize(storageType);
    },

    getCurrentType: function() {
        return this.currentType;
    }
};

// ============================================
// 사용
// ============================================

console.log('=== Strategy Pattern Example ===\n');

// 1. localStorage로 시작
storageManager.initialize('local');
storageManager.save('myKey', { value: 'test data' });

// 2. 런타임에 API로 변경
storageManager.switchStorage('api');
storageManager.save('myKey', { value: 'test data' });

// 3. 메모리 스토리지로 변경 (테스트용)
storageManager.switchStorage('memory');
storageManager.save('myKey', { value: 'test data' });

// 4. Service 직접 사용도 가능 (Manager 불필요)
console.log('\n--- Direct Service Usage ---');
restStorageService.save('directKey', { value: 'direct' });
localStorageService.save('directKey', { value: 'direct' });
memoryStorageService.save('directKey', { value: 'direct' });

console.log('\nCurrent storage type:', storageManager.getCurrentType());
```

### 4.4 장단점

**장점:**
- 런타임에 동작 변경 가능
- Service가 완전히 독립적
- 새로운 구현체 추가 용이
- 전략 패턴의 모든 장점
- 테스트 용이 (Mock Service)

**단점:**
- 초기 설정 복잡
- 구현체 관리 필요
- 인터페이스 일관성 유지 필요

### 4.5 사용 시기

- 여러 방식의 구현이 필요한 경우
- 환경에 따라 동작 변경 (Dev/Prod)
- A/B 테스트
- 테스트를 위한 Mock 필요

---

## 5. Event-Driven Service

### 5.1 개념

Service가 **이벤트를 발행**하고 Manager는 이벤트를 **구독**

### 5.2 특징

- ✅ Service와 Manager 완전 분리
- ✅ Service는 Manager의 존재를 모름
- ✅ 느슨한 결합 (Loose Coupling)
- ✅ 높은 확장성
- ✅ Observer Pattern 적용

### 5.3 코드 예시

```javascript
// ============================================
// Event Bus (중앙 이벤트 시스템)
// ============================================
var eventBus = {
    listeners: {},

    on: function(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },

    emit: function(event, data) {
        console.log('📢 Event emitted:', event);

        if (!this.listeners[event]) return;

        this.listeners[event].forEach(function(callback) {
            callback(data);
        });
    },

    off: function(event, callback) {
        if (!this.listeners[event]) return;

        this.listeners[event] = this.listeners[event].filter(function(cb) {
            return cb !== callback;
        });
    },

    once: function(event, callback) {
        var self = this;
        var wrapper = function(data) {
            callback(data);
            self.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
};

// ============================================
// Service: 독립적 모듈 (이벤트 발행)
// ============================================
var userService = {
    users: {},

    // ✅ Service는 자신의 일만 하고 이벤트 발행
    createUser: function(username, email) {
        // 검증
        if (!username || !email) {
            eventBus.emit('user:error', { error: 'Invalid input' });
            return null;
        }

        // 중복 체크
        for (var id in this.users) {
            if (this.users[id].email === email) {
                eventBus.emit('user:error', { error: 'Email already exists' });
                return null;
            }
        }

        // User 생성
        var user = {
            id: 'USER-' + Date.now(),
            username: username,
            email: email,
            createdAt: Date.now()
        };

        this.users[user.id] = user;

        // 이벤트 발행 (누가 듣든 상관없음)
        eventBus.emit('user:created', user);

        return user;
    },

    updateUser: function(userId, data) {
        var user = this.users[userId];

        if (!user) {
            eventBus.emit('user:error', {
                error: 'User not found',
                userId: userId
            });
            return null;
        }

        // 업데이트
        var oldData = {
            username: user.username,
            email: user.email
        };

        Object.assign(user, data);
        user.updatedAt = Date.now();

        eventBus.emit('user:updated', {
            user: user,
            oldData: oldData
        });

        return user;
    },

    deleteUser: function(userId) {
        var user = this.users[userId];

        if (!user) {
            eventBus.emit('user:error', {
                error: 'User not found',
                userId: userId
            });
            return false;
        }

        delete this.users[userId];

        eventBus.emit('user:deleted', {
            userId: userId,
            username: user.username
        });

        return true;
    },

    getUser: function(userId) {
        return this.users[userId];
    },

    getAllUsers: function() {
        var users = [];
        for (var id in this.users) {
            users.push(this.users[id]);
        }
        return users;
    }
};

// ============================================
// Manager: 이벤트 구독자 (선택적)
// ============================================

// Activity Logger Manager
var userActivityManager = {
    activities: [],

    initialize: function() {
        // ✅ Manager는 필요한 이벤트만 구독
        eventBus.on('user:created', this.logActivity.bind(this));
        eventBus.on('user:updated', this.logActivity.bind(this));
        eventBus.on('user:deleted', this.logActivity.bind(this));

        console.log('✅ Activity Manager initialized');
    },

    logActivity: function(data) {
        var activity = {
            timestamp: Date.now(),
            type: 'user_activity',
            data: data
        };

        this.activities.push(activity);
        console.log('📝 Activity logged:', data);
    },

    getActivities: function() {
        return this.activities;
    },

    clear: function() {
        this.activities = [];
    }
};

// Email Notification Manager
var emailNotificationManager = {
    sentEmails: [],

    initialize: function() {
        eventBus.on('user:created', this.sendWelcomeEmail.bind(this));
        eventBus.on('user:updated', this.sendUpdateNotification.bind(this));
        eventBus.on('user:deleted', this.sendGoodbyeEmail.bind(this));

        console.log('✅ Email Manager initialized');
    },

    sendWelcomeEmail: function(user) {
        var email = {
            to: user.email,
            subject: 'Welcome!',
            body: 'Welcome ' + user.username
        };
        this.sentEmails.push(email);
        console.log('📧 Welcome email sent to:', user.email);
    },

    sendUpdateNotification: function(data) {
        var email = {
            to: data.user.email,
            subject: 'Profile Updated',
            body: 'Your profile has been updated'
        };
        this.sentEmails.push(email);
        console.log('📧 Update notification sent to:', data.user.email);
    },

    sendGoodbyeEmail: function(data) {
        console.log('📧 Goodbye email would be sent for:', data.username);
    },

    getSentEmails: function() {
        return this.sentEmails;
    }
};

// Analytics Manager
var analyticsManager = {
    stats: {
        totalUsers: 0,
        activeUsers: 0,
        deletedUsers: 0
    },

    initialize: function() {
        eventBus.on('user:created', this.incrementTotal.bind(this));
        eventBus.on('user:deleted', this.incrementDeleted.bind(this));

        console.log('✅ Analytics Manager initialized');
    },

    incrementTotal: function() {
        this.stats.totalUsers++;
        this.stats.activeUsers++;
        console.log('📊 Total users:', this.stats.totalUsers);
    },

    incrementDeleted: function() {
        this.stats.activeUsers--;
        this.stats.deletedUsers++;
        console.log('📊 Active users:', this.stats.activeUsers);
    },

    getStats: function() {
        return this.stats;
    }
};

// ============================================
// 사용
// ============================================

console.log('=== Event-Driven Example ===\n');

// Manager들 초기화
userActivityManager.initialize();
emailNotificationManager.initialize();
analyticsManager.initialize();

console.log('\n--- Creating User ---');
// Service 직접 호출 (Manager 몰라도 됨!)
var user1 = userService.createUser('john', 'john@example.com');
// → user:created 이벤트 발행
// → userActivityManager가 자동 로깅
// → emailNotificationManager가 자동 이메일 발송
// → analyticsManager가 자동 통계 업데이트

console.log('\n--- Updating User ---');
userService.updateUser(user1.id, { email: 'newemail@example.com' });
// → user:updated 이벤트 발행
// → 구독한 Manager들이 자동 반응

console.log('\n--- Creating Another User ---');
var user2 = userService.createUser('jane', 'jane@example.com');

console.log('\n--- Statistics ---');
console.log('Activities:', userActivityManager.getActivities().length);
console.log('Emails sent:', emailNotificationManager.getSentEmails().length);
console.log('Stats:', analyticsManager.getStats());
```

### 5.4 장단점

**장점:**
- Service와 Manager 완전 분리
- Manager 추가/제거 쉬움
- 확장성 최고
- Observer 패턴의 장점
- 플러그인 아키텍처 가능

**단점:**
- 이벤트 흐름 추적 어려움
- 디버깅 복잡
- 이벤트 이름 관리 필요
- 메모리 누수 주의 (이벤트 해제)

### 5.5 사용 시기

- 마이크로서비스 아키텍처
- 플러그인 시스템
- 확장 가능한 시스템
- 느슨한 결합이 중요한 경우

---

## 6. Repository Pattern

### 6.1 개념

Service를 **데이터 CRUD 전용**으로, 비즈니스 로직은 Manager에

### 6.2 특징

- ✅ 명확한 책임 분리
- ✅ Service = 데이터 접근만
- ✅ Manager = 비즈니스 로직만
- ✅ CRUD 중심 앱에 적합
- ✅ 데이터 접근 추상화

### 6.3 코드 예시

```javascript
// ============================================
// Repository (Service): 데이터 CRUD만
// ============================================
var userRepository = {
    // ✅ 오직 데이터 저장/조회만
    save: function(user) {
        var key = 'user:' + user.id;
        localStorage.setItem(key, JSON.stringify(user));
        console.log('💾 User saved:', user.id);
    },

    findById: function(userId) {
        var key = 'user:' + userId;
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    findAll: function() {
        var users = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('user:')) {
                var data = localStorage.getItem(key);
                users.push(JSON.parse(data));
            }
        }
        return users;
    },

    findByEmail: function(email) {
        var users = this.findAll();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                return users[i];
            }
        }
        return null;
    },

    findByUsername: function(username) {
        var users = this.findAll();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                return users[i];
            }
        }
        return null;
    },

    delete: function(userId) {
        var key = 'user:' + userId;
        localStorage.removeItem(key);
        console.log('🗑️  User deleted:', userId);
    },

    exists: function(userId) {
        var key = 'user:' + userId;
        return localStorage.getItem(key) !== null;
    },

    count: function() {
        return this.findAll().length;
    },

    clear: function() {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('user:')) {
                keys.push(key);
            }
        }
        keys.forEach(function(key) {
            localStorage.removeItem(key);
        });
    }
};

// ============================================
// Manager: 비즈니스 로직
// ============================================
var userManager = {
    createUser: function(username, email, password) {
        console.log('Creating user:', username);

        // 비즈니스 규칙 1: 입력 검증
        var validation = this.validateUserInput(username, email, password);
        if (!validation.valid) {
            return { error: validation.error };
        }

        // 비즈니스 규칙 2: 중복 체크
        var existingEmail = userRepository.findByEmail(email);
        if (existingEmail) {
            return { error: "Email already exists" };
        }

        var existingUsername = userRepository.findByUsername(username);
        if (existingUsername) {
            return { error: "Username already exists" };
        }

        // 비즈니스 규칙 3: User 생성
        var user = {
            id: 'USER-' + Date.now(),
            username: username,
            email: email,
            passwordHash: this.hashPassword(password),
            createdAt: Date.now(),
            status: 'active',
            role: 'user',
            lastLogin: null
        };

        // Repository에 저장
        userRepository.save(user);

        console.log('✅ User created successfully:', user.id);

        return { success: true, user: user };
    },

    getUser: function(userId) {
        return userRepository.findById(userId);
    },

    updateEmail: function(userId, newEmail) {
        console.log('Updating email for user:', userId);

        // 비즈니스 규칙: 이메일 검증
        if (!this.validateEmail(newEmail)) {
            return { error: "Invalid email format" };
        }

        // 사용자 조회
        var user = userRepository.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }

        // 비즈니스 규칙: 중복 체크
        var duplicate = userRepository.findByEmail(newEmail);
        if (duplicate && duplicate.id !== userId) {
            return { error: "Email already in use" };
        }

        // 업데이트
        user.email = newEmail;
        user.updatedAt = Date.now();

        userRepository.save(user);

        console.log('✅ Email updated successfully');

        return { success: true, user: user };
    },

    updatePassword: function(userId, oldPassword, newPassword) {
        var user = userRepository.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }

        // 비즈니스 규칙: 기존 비밀번호 확인
        if (user.passwordHash !== this.hashPassword(oldPassword)) {
            return { error: "Incorrect old password" };
        }

        // 비즈니스 규칙: 새 비밀번호 검증
        if (!this.validatePassword(newPassword)) {
            return { error: "Password must be at least 8 characters" };
        }

        user.passwordHash = this.hashPassword(newPassword);
        user.updatedAt = Date.now();

        userRepository.save(user);

        return { success: true };
    },

    deleteUser: function(userId) {
        console.log('Deleting user:', userId);

        // 비즈니스 규칙: 사용자 존재 확인
        if (!userRepository.exists(userId)) {
            return { error: "User not found" };
        }

        // 비즈니스 규칙: 추가 확인 (예: 관리자는 삭제 불가)
        var user = userRepository.findById(userId);
        if (user.role === 'admin') {
            return { error: "Cannot delete admin users" };
        }

        userRepository.delete(userId);

        console.log('✅ User deleted successfully');

        return { success: true };
    },

    listUsers: function() {
        return userRepository.findAll();
    },

    getUserCount: function() {
        return userRepository.count();
    },

    login: function(username, password) {
        var user = userRepository.findByUsername(username);

        if (!user) {
            return { error: "Invalid username or password" };
        }

        if (user.passwordHash !== this.hashPassword(password)) {
            return { error: "Invalid username or password" };
        }

        // 로그인 성공
        user.lastLogin = Date.now();
        userRepository.save(user);

        return { success: true, user: user };
    },

    // 비즈니스 로직 헬퍼
    validateUserInput: function(username, email, password) {
        if (!this.validateUsername(username)) {
            return { valid: false, error: "Username must be 3-20 characters" };
        }

        if (!this.validateEmail(email)) {
            return { valid: false, error: "Invalid email format" };
        }

        if (!this.validatePassword(password)) {
            return { valid: false, error: "Password must be at least 8 characters" };
        }

        return { valid: true };
    },

    validateEmail: function(email) {
        return email && email.includes('@') && email.includes('.');
    },

    validatePassword: function(password) {
        return password && password.length >= 8;
    },

    validateUsername: function(username) {
        return username && username.length >= 3 && username.length <= 20;
    },

    hashPassword: function(password) {
        // 실제로는 bcrypt 등 사용
        return 'HASHED-' + password;
    }
};

// ============================================
// 사용
// ============================================

console.log('=== Repository Pattern Example ===\n');

// 1. Manager를 통한 비즈니스 로직
console.log('--- Creating Users ---');
var result1 = userManager.createUser('john', 'john@example.com', 'password123');
console.log('Result:', result1.success ? 'Success' : result1.error);

var result2 = userManager.createUser('jane', 'jane@example.com', 'pass');
console.log('Result:', result2.success ? 'Success' : result2.error);

var result3 = userManager.createUser('bob', 'bob@example.com', 'password456');
console.log('Result:', result3.success ? 'Success' : result3.error);

// 2. Repository 직접 사용 (단순 조회)
console.log('\n--- Direct Repository Access ---');
var user = userRepository.findById(result1.user.id);
console.log('Found user:', user.username);

var allUsers = userRepository.findAll();
console.log('Total users:', allUsers.length);

// 3. Manager를 통한 업데이트
console.log('\n--- Updating User ---');
var updateResult = userManager.updateEmail(result1.user.id, 'newemail@example.com');
console.log('Update result:', updateResult.success ? 'Success' : updateResult.error);

// 4. 로그인
console.log('\n--- Login ---');
var loginResult = userManager.login('john', 'password123');
console.log('Login result:', loginResult.success ? 'Success' : loginResult.error);
```

### 6.4 장단점

**장점:**
- 책임이 매우 명확
- 데이터 접근 로직 중앙화
- 비즈니스 로직과 데이터 접근 분리
- 테스트 용이
- 데이터베이스 변경 쉬움

**단점:**
- Service가 수동적 역할
- Manager에 비즈니스 로직 집중
- Service 독립성은 낮음

### 6.5 사용 시기

- CRUD 중심 애플리케이션
- 데이터베이스 중심 설계
- 엔터프라이즈 애플리케이션
- 복잡한 데이터 접근 로직

---

## 7. 패턴 비교 및 선택 가이드

### 7.1 패턴 비교표

| 패턴 | Service 역할 | Manager 역할 | Service 독립성 | 복잡도 | 비즈니스 로직 위치 |
|------|-------------|-------------|--------------|-------|------------------|
| **순수 함수** | 유틸리티 함수 | 상태 관리 | ★★★★★ | ⭐ | Service |
| **도메인 Service** ⭐ | 비즈니스 로직 핵심 | 선택적 래퍼 | ★★★★☆ | ⭐⭐ | Service |
| **전략 패턴** | 여러 구현체 | 구현체 선택 | ★★★★☆ | ⭐⭐⭐ | Service |
| **Event-Driven** | 이벤트 발행 | 이벤트 구독 | ★★★★★ | ⭐⭐⭐⭐ | Service |
| **Repository** | 데이터 CRUD | 비즈니스 로직 | ★★★☆☆ | ⭐⭐ | Manager |

### 7.2 프로젝트 규모별 추천

| 규모 | 추천 패턴 | 이유 |
|------|----------|------|
| **소규모** (< 10 파일) | 순수 함수 | 단순, 빠른 개발 |
| **중규모** (10-50 파일) | 도메인 Service ⭐ | 균형, 실용성 |
| **대규모** (50+ 파일) | 도메인 Service + Event-Driven | 확장성, 유지보수 |
| **엔터프라이즈** | Repository + Event-Driven | 명확한 책임, 느슨한 결합 |

### 7.3 상황별 선택 플로우차트

```
시작
  ↓
Service 독립성이 최우선인가?
├─ YES → 순수 함수 또는 Event-Driven
└─ NO
    ↓
    여러 구현 방식이 필요한가?
    ├─ YES → 전략 패턴
    └─ NO
        ↓
        CRUD 중심 앱인가?
        ├─ YES → Repository
        └─ NO → 도메인 Service ⭐ (가장 균형잡힌 선택)
```

### 7.4 특성별 비교

#### Service 독립성

```
높음 ────────────────────────── 낮음
  ↑                              ↓
순수함수                    Repository
Event-Driven
도메인Service
전략패턴
```

#### 복잡도

```
낮음 ────────────────────────── 높음
  ↑                              ↓
순수함수                    Event-Driven
도메인Service
Repository
전략패턴
```

#### 실무 적용도

```
도메인 Service ★★★★★
전략 패턴    ★★★★☆
Repository  ★★★★☆
Event-Driven ★★★☆☆
순수 함수    ★★★☆☆
```

### 7.5 조합 패턴

**추천 조합:**

```javascript
// 1. 도메인 Service + Event-Driven (대규모)
var userService = {
    createUser: function(data) {
        // 도메인 로직
        var user = this.create(data);

        // 이벤트 발행
        eventBus.emit('user:created', user);

        return user;
    }
};

// 2. 전략 패턴 + Repository (엔터프라이즈)
var storageManager = {
    repository: null,

    initialize: function(type) {
        // 전략 선택
        if (type === 'api') {
            this.repository = apiRepository;
        } else {
            this.repository = localRepository;
        }
    },

    save: function(data) {
        // Repository 사용
        return this.repository.save(data);
    }
};

// 3. 도메인 Service + 전략 패턴 (유연성)
var paymentService = {
    providers: {
        stripe: stripePaymentProvider,
        paypal: paypalPaymentProvider
    },

    processPayment: function(provider, amount) {
        // 전략 선택
        var paymentProvider = this.providers[provider];

        // 도메인 로직
        return paymentProvider.charge(amount);
    }
};
```

### 7.6 실천 체크리스트

```javascript
// ✅ Service 독립성 체크리스트

// 1. Service가 Manager 없이 동작하는가?
var result = userService.createUser('john', 'john@example.com');
// → Manager 없이도 완전히 동작해야 함

// 2. Service가 Manager의 존재를 모르는가?
// Service 코드를 확인:
// - Manager 참조가 없어야 함
// - Manager import가 없어야 함

// 3. Service를 다른 곳에서 재사용할 수 있는가?
function someOtherFunction() {
    return userService.createUser('test', 'test@example.com');
}
// → 어디서든 호출 가능해야 함

// 4. Service를 독립적으로 테스트할 수 있는가?
function testService() {
    var user = userService.createUser('test', 'test@example.com');
    console.assert(user !== null);
}
// → Manager 없이 테스트 가능해야 함

// 5. Manager는 선택적인가?
// → Manager가 없어도 Service만으로 기능이 완성되어야 함

// 6. Service 메서드가 순수 함수적인가? (순수 함수 패턴)
var result1 = service.update(element, 'key', 'value');
var result2 = service.update(element, 'key', 'value');
// → 같은 입력에 항상 같은 출력

// 7. Service가 이벤트를 통해 통신하는가? (Event-Driven)
// → Service는 emit만, Manager는 subscribe만

// 8. Service가 여러 구현체를 가지는가? (전략 패턴)
// → 같은 인터페이스, 다른 구현

// 9. Service가 데이터만 다루는가? (Repository)
// → CRUD 외의 로직이 없어야 함
```

### 7.7 최종 권장사항

#### **기본 선택: 도메인 Service 패턴** ⭐

```javascript
// Service가 완전한 기능 제공
var result = cartService.addItem(cart, product, quantity);  // ✅

// Manager는 선택적 편의 기능
var result = cartManager.addItem(product, quantity);  // ✅
```

**이유:**
- Service가 독립적으로 완전한 기능
- Manager는 필요할 때만 사용
- 실무에서 가장 균형잡힌 접근
- 재사용성과 유지보수성 모두 우수

#### **확장이 필요하면:**

**Event-Driven 추가**
```javascript
// Service는 이벤트 발행
userService.createUser(data);  // → 이벤트 emit

// Manager는 구독 (선택적)
userActivityManager.initialize();  // → 이벤트 subscribe
```

**전략 패턴 적용**
```javascript
// 여러 구현체
storageManager.switchStorage('api');  // API 사용
storageManager.switchStorage('local'); // localStorage 사용
```

### 7.8 핵심 원칙

```
Service = 독립적 모듈 (누구나 호출 가능)
Manager = 선택적 조율자 (필요할 때만)
```

**Service가 독립적이면:**
- ✅ 재사용 가능
- ✅ 테스트 용이
- ✅ 유지보수 쉬움
- ✅ 확장 가능
- ✅ 팀 협업 원활

### 7.9 다음 단계

1. **현재 프로젝트 평가**
   - Service의 독립성 확인
   - Manager 의존도 측정

2. **패턴 선택**
   - 프로젝트 규모 고려
   - 팀 역량 고려
   - 비즈니스 요구사항 고려

3. **점진적 리팩토링**
   - 한 번에 전환하지 말고
   - 새로운 기능부터 적용
   - 기존 코드는 점진적 개선

4. **팀 컨벤션 문서화**
   - 선택한 패턴 명시
   - 예제 코드 작성
   - 가이드라인 공유

---

## 부록: 실전 마이그레이션 예제

### A. 기존 코드 (Manager 종속)

```javascript
// ❌ Service가 Manager에 종속
var elementManager = {
    element: null,

    create: function() {
        this.element = { key: null, value: null };
    },

    update: function(key, value) {
        if (!this.element) return;
        this.element.key = key;
        this.element.value = value;
    }
};

// Manager 없이는 사용 불가
elementManager.create();
elementManager.update('key', 'value');
```

### B. 리팩토링 (도메인 Service)

```javascript
// ✅ Service 독립적
var elementService = {
    create: function() {
        return { key: null, value: null };
    },

    update: function(element, key, value) {
        element.key = key;
        element.value = value;
        return element;
    }
};

// ✅ Service 직접 사용 가능
var element = elementService.create();
elementService.update(element, 'key', 'value');

// ✅ Manager는 선택적
var elementManager = {
    element: null,

    initialize: function() {
        this.element = elementService.create();
    },

    update: function(key, value) {
        elementService.update(this.element, key, value);
    }
};
```

---

**작성일**: 2025-10-29
**버전**: 1.0.0
**관련 문서**: layer-architecture-patterns.md, section2-3-answers.md
