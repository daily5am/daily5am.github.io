# Spring Bean作用域和生命周期

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Spring Bean作用域和生命周期的完整指南。

Spring Bean的作用域和生命周期是Spring框架的核心概念，理解这些对于使用Spring框架至关重要。

## 核心问题

### Bean的作用域

1. **singleton（默认）**：单例，整个容器中只有一个实例
2. **prototype**：原型，每次获取都创建新实例
3. **request**：每个HTTP请求创建一个实例
4. **session**：每个HTTP会话创建一个实例
5. **application**：整个Web应用生命周期内只有一个实例

### Bean的生命周期

1. **实例化（Instantiation）**
   - 调用构造函数创建Bean实例

2. **属性赋值（Populate Properties）**
   - 注入依赖属性

3. **初始化（Initialization）**
   - 调用BeanPostProcessor的postProcessBeforeInitialization
   - 调用InitializingBean的afterPropertiesSet
   - 调用自定义init-method
   - 调用BeanPostProcessor的postProcessAfterInitialization

4. **使用（In Use）**
   - Bean可以被使用

5. **销毁（Destruction）**
   - 调用DisposableBean的destroy
   - 调用自定义destroy-method

## 扩展点

### BeanPostProcessor

```java
public interface BeanPostProcessor {
    Object postProcessBeforeInitialization(Object bean, String beanName);
    Object postProcessAfterInitialization(Object bean, String beanName);
}
```

### InitializingBean和DisposableBean

```java
public interface InitializingBean {
    void afterPropertiesSet() throws Exception;
}

public interface DisposableBean {
    void destroy() throws Exception;
}
```

## 常见面试题

1. **Bean的作用域如何选择？**
   - 无状态Bean使用singleton
   - 有状态Bean使用prototype
   - Web相关使用request/session

2. **循环依赖如何解决？**
   - 使用三级缓存
   - 提前暴露半成品Bean
   - 使用@Lazy延迟加载

3. **Bean的生命周期扩展点？**
   - BeanPostProcessor
   - InitializingBean
   - DisposableBean
   - @PostConstruct和@PreDestroy

