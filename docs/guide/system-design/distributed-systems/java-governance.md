# Java服务治理

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Java服务治理技术的完整指南。

## 🎯 概述

服务治理是微服务架构中的重要组成部分，包括限流、熔断、降级、负载均衡等功能，保证系统的稳定性和可用性。

## 📚 核心功能

### 限流 (Rate Limiting)

限流是控制服务请求速率，防止系统过载。

#### 算法

- **固定窗口**: 固定时间窗口内的请求数限制
- **滑动窗口**: 滑动时间窗口内的请求数限制
- **令牌桶**: 令牌桶算法
- **漏桶**: 漏桶算法

#### Sentinel限流

```java
// Sentinel配置
@Configuration
public class SentinelConfig {
    @PostConstruct
    public void init() {
        // 定义限流规则
        List<FlowRule> rules = new ArrayList<>();
        FlowRule rule = new FlowRule();
        rule.setResource("getUser");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(100); // QPS限制为100
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }
}

// 使用
@Service
public class UserService {
    @SentinelResource(value = "getUser", blockHandler = "handleBlock")
    public User getUser(Long id) {
        return userRepository.findById(id);
    }
    
    public User handleBlock(Long id, BlockException ex) {
        // 限流降级处理
        return new User();
    }
}
```

#### Resilience4j限流

```java
// Resilience4j限流
@Configuration
public class Resilience4jConfig {
    @Bean
    public RateLimiter userServiceRateLimiter() {
        return RateLimiter.of("userService", 
            RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .limitForPeriod(100)
                .timeoutDuration(Duration.ofMillis(100))
                .build());
    }
}

// 使用
@Service
public class UserService {
    @Autowired
    private RateLimiter rateLimiter;
    
    public User getUser(Long id) {
        return rateLimiter.executeSupplier(() -> {
            return userRepository.findById(id);
        });
    }
}
```

### 熔断 (Circuit Breaker)

熔断是当服务异常率过高时，快速失败，避免级联故障。

#### Hystrix熔断

```java
// Hystrix命令
@Component
public class UserServiceCommand extends HystrixCommand<User> {
    private Long userId;
    
    public UserServiceCommand(Long userId) {
        super(HystrixCommandGroupKey.Factory.asKey("UserGroup"),
            HystrixCommandProperties.Setter()
                .withCircuitBreakerRequestVolumeThreshold(10)
                .withCircuitBreakerErrorThresholdPercentage(50)
                .withCircuitBreakerSleepWindowInMilliseconds(5000));
        this.userId = userId;
    }
    
    @Override
    protected User run() throws Exception {
        return userService.getUser(userId);
    }
    
    @Override
    protected User getFallback() {
        return new User(); // 熔断降级
    }
}
```

#### Resilience4j熔断

```java
// Resilience4j熔断
@Configuration
public class Resilience4jConfig {
    @Bean
    public CircuitBreaker userServiceCircuitBreaker() {
        return CircuitBreaker.of("userService",
            CircuitBreakerConfig.custom()
                .failureRateThreshold(50)
                .waitDurationInOpenState(Duration.ofMillis(1000))
                .slidingWindowSize(10)
                .build());
    }
}

// 使用
@Service
public class UserService {
    @Autowired
    private CircuitBreaker circuitBreaker;
    
    public User getUser(Long id) {
        return circuitBreaker.executeSupplier(() -> {
            return userRepository.findById(id);
        });
    }
}
```

### 降级 (Degradation)

降级是在系统压力过大时，暂时关闭非核心功能，保证核心功能可用。

#### 服务降级

```java
// 降级策略
@Service
public class UserService {
    @HystrixCommand(fallbackMethod = "getUserFallback")
    public User getUser(Long id) {
        return userRepository.findById(id);
    }
    
    public User getUserFallback(Long id) {
        // 降级逻辑：返回默认用户
        return User.defaultUser();
    }
    
    @HystrixCommand(fallbackMethod = "getUserDetailFallback")
    public UserDetail getUserDetail(Long id) {
        return userDetailRepository.findById(id);
    }
    
    public UserDetail getUserDetailFallback(Long id) {
        // 降级逻辑：返回简化信息
        return UserDetail.simple(id);
    }
}
```

#### 功能降级

```java
// 功能开关
@Component
public class FeatureToggle {
    @Value("${feature.detail.enabled:true}")
    private boolean detailEnabled;
    
    public boolean isDetailEnabled() {
        return detailEnabled;
    }
}

// 使用
@Service
public class UserService {
    @Autowired
    private FeatureToggle featureToggle;
    
    public UserInfo getUserInfo(Long id) {
        User user = getUser(id);
        if (featureToggle.isDetailEnabled()) {
            UserDetail detail = getUserDetail(id);
            return UserInfo.withDetail(user, detail);
        } else {
            return UserInfo.simple(user);
        }
    }
}
```

### 负载均衡

负载均衡是将请求分发到多个服务实例。

#### Ribbon负载均衡

```java
// Ribbon配置
@Configuration
public class RibbonConfig {
    @Bean
    public IRule ribbonRule() {
        return new RoundRobinRule(); // 轮询
        // return new RandomRule(); // 随机
        // return new WeightedResponseTimeRule(); // 加权响应时间
    }
}

// 使用
@Service
public class UserService {
    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;
    
    public User getUser(Long id) {
        return restTemplate.getForObject(
            "http://user-service/users/{id}", 
            User.class, 
            id
        );
    }
}
```

#### Spring Cloud LoadBalancer

```java
// LoadBalancer配置
@Configuration
public class LoadBalancerConfig {
    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(
        Environment environment,
        LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name);
    }
}
```

## 🔧 综合方案

### Sentinel完整示例

```java
// Sentinel完整配置
@Configuration
public class SentinelConfig {
    @PostConstruct
    public void init() {
        // 限流规则
        initFlowRules();
        // 熔断规则
        initCircuitBreakerRules();
        // 降级规则
        initDegradeRules();
    }
    
    private void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();
        FlowRule rule = new FlowRule();
        rule.setResource("getUser");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(100);
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }
    
    private void initCircuitBreakerRules() {
        List<CircuitBreakerRule> rules = new ArrayList<>();
        CircuitBreakerRule rule = new CircuitBreakerRule();
        rule.setResource("getUser");
        rule.setGrade(CircuitBreakerStrategy.ERROR_RATIO);
        rule.setCount(0.5); // 错误率50%
        rule.setTimeWindow(10); // 时间窗口10秒
        rules.add(rule);
        CircuitBreakerRuleManager.loadRules(rules);
    }
    
    private void initDegradeRules() {
        List<DegradeRule> rules = new ArrayList<>();
        DegradeRule rule = new DegradeRule();
        rule.setResource("getUser");
        rule.setGrade(RuleConstant.DEGRADE_GRADE_RT);
        rule.setCount(1000); // RT阈值1000ms
        rule.setTimeWindow(10); // 时间窗口10秒
        rules.add(rule);
        DegradeRuleManager.loadRules(rules);
    }
}
```

## 💡 最佳实践

1. **限流策略**: 根据系统容量设置合理的限流阈值
2. **熔断配置**: 设置合理的熔断阈值和时间窗口
3. **降级方案**: 设计完善的降级策略
4. **监控告警**: 监控服务治理指标
5. **动态调整**: 支持动态调整治理规则

## 📖 学习资源

- [Sentinel官方文档](https://sentinelguard.io/)
- [Resilience4j官方文档](https://resilience4j.readme.io/)
- [Hystrix官方文档](https://github.com/Netflix/Hystrix)

## 💡 下一步

- [Spring Cloud](./java-spring-cloud) - Spring Cloud微服务生态
- [Apache Dubbo](./java-dubbo) - Dubbo RPC框架
- [分布式事务解决方案](./java-transaction) - Seata、LCN等

---

*最后更新时间: 2025-01-20*



