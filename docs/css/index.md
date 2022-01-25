# CSS Grid

> 设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效

## 容器属性
### display
display: grid指定一个容器采用网格布局

### auto-fill
有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充

### fr
为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍

### minmax
minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值

### auto
auto关键字表示由浏览器自己决定长度

### 网格线的名称
grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用

> 网格布局允许同一根线有多个名字，比如[fifth-line row-5]

### 布局实例
grid-template-columns属性对于网页布局非常有用。两栏式布局只需要一行代码

### row-gap，column-gap，gap
row-gap属性设置行与行的间隔（行间距），column-gap属性设置列与列的间隔（列间距）

### grid-template-areas
网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域

### grid-auto-flow
划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序

>grid-auto-flow属性除了设置成row和column，还可以设成row dense和column dense。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置

### justify-items，align-items，place-items
justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）

### justify-content，align-content，place-content
justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）

### grid-auto-columns，grid-auto-rows
有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目

grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高

### grid-template，grid
grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式


## 项目属性
### grid-column-start，grid-column-end，grid-row-start，grid-row-end

grid-column-start属性：左边框所在的垂直网格线<br>
grid-column-end属性：右边框所在的垂直网格线<br>
grid-row-start属性：上边框所在的水平网格线<br>
grid-row-end属性：下边框所在的水平网格线<br>

> 这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字

> 这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格

### grid-column，grid-row
grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式
```css
grid-column: <start-line> / <end-line>;
grid-row: <start-line> / <end-line>;
```
> 斜杠以及后面的部分可以省略，默认跨越一个网格

### grid-area
grid-area属性指定项目放在哪一个区域

grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置
```css
grid-area: e;
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
```

### justify-self，align-self，place-self
justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目

align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目
```css
place-self: <align-self> <justify-self>;
```

## Demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .container {
        display: grid;
        /* grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px 100px 100px; */
        /* grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: 33.33% 33.33% 33.33%; */
        /* grid-template-columns: repeat(3, 33.33%);
        grid-template-rows: repeat(3, 33.33%); */
        /* grid-template-columns: repeat(2, 100px 20px 80px); */
        /* grid-template-columns: repeat(auto-fill, 100px); */
        /* grid-template-columns: 150px 1fr 2fr; */
        /* grid-template-columns: 1fr 1fr minmax(400px, 1fr); */
        /* grid-template-columns: 100px auto 100px; */
        /* grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
        grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4]; */
        /* grid-template-columns: 70% 30%; */
        /* grid-template-columns: repeat(3, 1fr); */
        /* row-gap: 20px;
        column-gap: 20px; */
        /* gap: 20px 20px; */
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        /* grid-template-areas: 'a b c' 'd e f' 'g h i'; */
        /* grid-template-areas: 'a a a' 'b b b' 'c c c'; */
        /* grid-template-areas: 'header header header' 'main main sidebar' 'footer footer footer'; */
        /* grid-template-areas: 'a . c' 'd . f' 'g . i'; */
        /* grid-auto-flow: column dense; */
        /* justify-items: end;
        align-items: end; */
        /* place-items: end end; */
        /* place-items: end; */
        /* justify-content: end;
        align-content: end; */
        /* place-content: space-evenly; */
        grid-auto-rows: 50px;
      }

      .item {
        background-color: green;
        border: 1px solid red;
      }

      .item1 {
        /* grid-column-start: span 2; */
        /* grid-column: 1 / 4; */
        /* grid-area: e; */
        /* grid-area: 1 / 1 / 1 / 4; */
        place-self: center center;
        /* grid-column-end: 3; */
        /* grid-row-start: 2;
        grid-row-end: 4; */
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="item item1">1</div>
      <div class="item item2">2</div>
      <div class="item item3">3</div>
      <div class="item item4">4</div>
      <div class="item item5">5</div>
      <div class="item item6">6</div>
      <div class="item item7">7</div>
      <div class="item item8">8</div>
      <div class="item item9">9</div>
    </div>
  </body>
</html>
```
