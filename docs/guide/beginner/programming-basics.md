# 编程语言基础

编程语言是软件开发的基础，选择合适的编程语言并掌握其基础语法是每个开发者的必经之路。

## 🎯 学习目标

- 理解编程语言的基本概念
- 掌握至少一门编程语言的基础语法
- 能够编写简单的程序
- 建立正确的编程思维

## 📚 编程语言选择

### 主流编程语言对比

| 语言 | 适用场景 | 学习难度 | 就业前景 | 推荐指数 |
|------|----------|----------|----------|----------|
| Python | 数据分析、AI、Web开发 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Java | 企业级应用、Android | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| JavaScript | 前端开发、Node.js | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| C++ | 系统编程、游戏开发 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Go | 微服务、云原生 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### 推荐学习路径

1. **Python** - 适合初学者，语法简洁，应用广泛
2. **JavaScript** - 前端必备，全栈开发
3. **Java** - 企业级开发，就业机会多
4. **Go** - 现代语言，云原生开发

## 🔧 基础语法学习

### 1. 变量和数据类型

```python
# Python示例
name = "张三"  # 字符串
age = 25      # 整数
height = 1.75 # 浮点数
is_student = True  # 布尔值

# 类型检查
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>
```

```javascript
// JavaScript示例
let name = "张三";     // 字符串
let age = 25;         // 数字
let height = 1.75;    // 数字
let isStudent = true; // 布尔值

// 类型检查
console.log(typeof name);  // string
console.log(typeof age);   // number
```

### 2. 控制结构

```python
# 条件语句
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 循环语句
for i in range(5):
    print(f"第{i+1}次循环")

# while循环
count = 0
while count < 3:
    print(f"计数: {count}")
    count += 1
```

```javascript
// 条件语句
if (age >= 18) {
    console.log("成年人");
} else if (age >= 13) {
    console.log("青少年");
} else {
    console.log("儿童");
}

// 循环语句
for (let i = 0; i < 5; i++) {
    console.log(`第${i+1}次循环`);
}

// while循环
let count = 0;
while (count < 3) {
    console.log(`计数: ${count}`);
    count++;
}
```

### 3. 函数定义

```python
# 函数定义
def greet(name, age=18):
    """问候函数"""
    return f"你好，{name}！你今年{age}岁。"

# 函数调用
message = greet("张三", 25)
print(message)  # 你好，张三！你今年25岁。

# 匿名函数
square = lambda x: x ** 2
print(square(5))  # 25
```

```javascript
// 函数定义
function greet(name, age = 18) {
    return `你好，${name}！你今年${age}岁。`;
}

// 函数调用
const message = greet("张三", 25);
console.log(message);  // 你好，张三！你今年25岁。

// 箭头函数
const square = x => x ** 2;
console.log(square(5));  // 25
```

## 🏗️ 数据结构基础

### 1. 数组/列表

```python
# Python列表
fruits = ["苹果", "香蕉", "橙子"]
fruits.append("葡萄")  # 添加元素
fruits.remove("香蕉")  # 删除元素

# 列表推导式
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
```

```javascript
// JavaScript数组
let fruits = ["苹果", "香蕉", "橙子"];
fruits.push("葡萄");    // 添加元素
fruits.splice(1, 1);   // 删除元素

// 数组方法
const squares = Array.from({length: 5}, (_, i) => i**2);
console.log(squares);  // [0, 1, 4, 9, 16]
```

### 2. 字典/对象

```python
# Python字典
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 访问和修改
print(person["name"])  # 张三
person["age"] = 26
```

```javascript
// JavaScript对象
let person = {
    name: "张三",
    age: 25,
    city: "北京"
};

// 访问和修改
console.log(person.name);  // 张三
person.age = 26;
```

## 🎯 实践练习

### 练习1：计算器程序

```python
def calculator():
    """简单计算器"""
    print("简单计算器")
    print("支持的操作: +, -, *, /")
    
    try:
        num1 = float(input("请输入第一个数字: "))
        operator = input("请输入操作符: ")
        num2 = float(input("请输入第二个数字: "))
        
        if operator == "+":
            result = num1 + num2
        elif operator == "-":
            result = num1 - num2
        elif operator == "*":
            result = num1 * num2
        elif operator == "/":
            if num2 == 0:
                print("错误：除数不能为零")
                return
            result = num1 / num2
        else:
            print("错误：不支持的操作符")
            return
            
        print(f"结果: {num1} {operator} {num2} = {result}")
        
    except ValueError:
        print("错误：请输入有效的数字")

# 运行计算器
calculator()
```

### 练习2：猜数字游戏

```python
import random

def guess_number():
    """猜数字游戏"""
    number = random.randint(1, 100)
    attempts = 0
    max_attempts = 7
    
    print("欢迎来到猜数字游戏！")
    print("我想了一个1到100之间的数字，你能猜出来吗？")
    print(f"你有{max_attempts}次机会")
    
    while attempts < max_attempts:
        try:
            guess = int(input(f"第{attempts + 1}次猜测，请输入你的猜测: "))
            attempts += 1
            
            if guess == number:
                print(f"🎉 恭喜你！你猜对了！数字是{number}")
                print(f"你用了{attempts}次猜测")
                return
            elif guess < number:
                print("📈 太小了，再试试！")
            else:
                print("📉 太大了，再试试！")
                
        except ValueError:
            print("请输入有效的数字")
    
    print(f"😔 游戏结束！数字是{number}")
    print("下次加油！")

# 运行游戏
guess_number()
```

## 📖 学习资源

### 在线教程
- [Python官方教程](https://docs.python.org/3/tutorial/)
- [JavaScript MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [菜鸟教程](https://www.runoob.com/)

### 实践平台
- [LeetCode](https://leetcode.cn/) - 算法练习
- [HackerRank](https://www.hackerrank.com/) - 编程挑战
- [Codecademy](https://www.codecademy.com/) - 交互式学习

## 🎥 视频教程

<VideoPlayer src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

## 💡 学习建议

1. **多动手实践** - 理论结合实践，多写代码
2. **循序渐进** - 从简单到复杂，不要急于求成
3. **多做练习** - 通过练习巩固知识点
4. **阅读代码** - 学会阅读和理解他人的代码
5. **持续学习** - 编程语言在不断发展，保持学习

## 🔄 下一步

掌握编程语言基础后，你可以：
- 学习更高级的编程概念
- 开始学习数据结构和算法
- 尝试开发简单的项目
- 进入下一个学习阶段

准备好学习 [开发环境搭建](./dev-environment) 了吗？

---

> 💡 **提示**: 编程语言只是工具，重要的是编程思维和解决问题的能力。选择一门语言深入学习，比浅尝辄止多门语言更有价值。
