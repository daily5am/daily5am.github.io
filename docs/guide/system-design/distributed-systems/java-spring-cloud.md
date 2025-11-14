# Spring Cloud 微服务生态

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Spring Cloud微服务生态的完整指南。

## 🎯 概述

Spring Cloud是构建分布式系统和微服务架构的工具集，提供了服务发现、配置管理、负载均衡、熔断器等微服务开发所需的基础设施。

## 📚 核心组件

### 服务注册与发现

#### Eureka

Eureka是Netflix开源的服务注册与发现组件。

```java
// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// Eureka Client
@SpringBootApplication
@EnableEurekaClient
public class ServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceApplication.class, args);
    }
}
```

#### Nacos

Nacos是阿里巴巴开源的服务注册与发现、配置管理平台。

```java
// Nacos配置
@SpringBootApplication
@NacosPropertySource(dataId = "application", autoRefreshed = true)
public class NacosApplication {
    public static void main(String[] args) {
        SpringApplication.run(NacosApplication.class, args);
    }
}
```

### 服务调用

#### OpenFeign

OpenFeign是声明式的HTTP客户端。

```java
// Feign客户端
@FeignClient(name = "user-service", fallback = UserServiceFallback.class)
public interface UserServiceClient {
    @GetMapping("/users/{id}")
    User getUser(@PathVariable Long id);
    
    @PostMapping("/users")
    User createUser(@RequestBody User user);
}

// 降级处理
@Component
public class UserServiceFallback implements UserServiceClient {
    @Override
    public User getUser(Long id) {
        return new User(); // 降级逻辑
    }
    
    @Override
    public User createUser(User user) {
        return null;
    }
}
```

#### RestTemplate

```java
// RestTemplate配置
@Configuration
public class RestTemplateConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// 使用
@Service
public class UserService {
    @Autowired
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

### 配置管理

#### Spring Cloud Config

```java
// Config Server
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}

// Config Client
@SpringBootApplication
@RefreshScope
public class ConfigClientApplication {
    @Value("${config.value}")
    private String configValue;
}
```

### 服务网关

#### Spring Cloud Gateway

```java
// Gateway配置
@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r.path("/api/users/**")
                .uri("lb://user-service"))
            .route("order-service", r -> r.path("/api/orders/**")
                .uri("lb://order-service"))
            .build();
    }
    
    @Bean
    public GlobalFilter customFilter() {
        return (exchange, chain) -> {
            // 自定义过滤器逻辑
            return chain.filter(exchange);
        };
    }
}
```

### 熔断降级

#### Hystrix

```java
// Hystrix命令
@Component
public class UserServiceCommand extends HystrixCommand<User> {
    private Long userId;
    
    public UserServiceCommand(Long userId) {
        super(HystrixCommandGroupKey.Factory.asKey("UserGroup"));
        this.userId = userId;
    }
    
    @Override
    protected User run() throws Exception {
        return userService.getUser(userId);
    }
    
    @Override
    protected User getFallback() {
        return new User(); // 降级逻辑
    }
}
```

#### Resilience4j

```java
// Resilience4j配置
@Configuration
public class Resilience4jConfig {
    @Bean
    public CircuitBreaker userServiceCircuitBreaker() {
        return CircuitBreaker.of("userService", 
            CircuitBreakerConfig.custom()
                .failureRateThreshold(50)
                .waitDurationInOpenState(Duration.ofMillis(1000))
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

### 分布式追踪

#### Sleuth + Zipkin

```java
// 自动追踪
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 自定义追踪
@Service
public class UserService {
    @Autowired
    private Tracer tracer;
    
    public User getUser(Long id) {
        Span span = tracer.nextSpan().name("getUser").start();
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            return userRepository.findById(id);
        } finally {
            span.end();
        }
    }
}
```

## 🔧 完整示例

### 微服务架构

```
Gateway -> Service A -> Service B
         -> Service C
```

### 项目结构

```
spring-cloud-demo/
├── eureka-server/          # 注册中心
├── config-server/          # 配置中心
├── gateway/                # API网关
├── user-service/          # 用户服务
├── order-service/         # 订单服务
└── common/                # 公共模块
```

### 配置文件

```yaml
# application.yml
spring:
  application:
    name: user-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
        file-extension: yml
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
```

## 🚀 最佳实践

### 1. 服务拆分

- **按业务域拆分**: 根据业务领域拆分服务
- **单一职责**: 每个服务职责单一
- **数据独立**: 每个服务有独立的数据库

### 2. 服务治理

- **服务发现**: 使用Eureka或Nacos
- **负载均衡**: 使用Ribbon或Spring Cloud LoadBalancer
- **熔断降级**: 使用Hystrix或Resilience4j
- **限流**: 使用Sentinel或Gateway限流

### 3. 配置管理

- **集中配置**: 使用Config Server或Nacos
- **动态刷新**: 支持配置动态更新
- **环境隔离**: 不同环境使用不同配置

### 4. 监控告警

- **链路追踪**: 使用Sleuth + Zipkin
- **指标监控**: 使用Micrometer + Prometheus
- **日志聚合**: 使用ELK或Loki

## 📖 学习资源

- [Spring Cloud官方文档](https://spring.io/projects/spring-cloud)
- [Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba)
- [Nacos官方文档](https://nacos.io/)

## 💡 下一步

- [Apache Dubbo](./java-dubbo) - Dubbo RPC框架
- [分布式事务解决方案](./java-transaction) - Seata、LCN等
- [服务治理](./java-governance) - 限流、熔断、降级

---

*最后更新时间: 2025-01-20*



