import "./styles.css";
import React, { useState } from "react";

const values = [
  { id: 1, item: "赤" },
  { id: 2, item: "青" },
  { id: 3, item: "黄" }
];

//実際にレンダリングされる子コンポーネント
//外側で定義したonChangeイベントの関数と、初期値であるcheckedも受け取っている
//map()メソッド自体は単一業のため、returnが省略されているらしい
//map()の中身は複数行だけど、map自体は単一だからと思ってるけどどうだろう
//よってラジオボタンのJSXが配列という形でこのコンポーネントに入っている、はず
//コールバック関数の波括弧とvalues.mapメソッド前のreturnを省略しても同じ意味
const RadioBtnItems = ({ onChange, checked }) => {
  /*おそらくvaluesの値を仮引数valueで受け取っている*/

  return values.map((value) => {
    return (
      <label key={value.id}>
        <input
          type="radio"
          value={value.item}
          onChange={onChange}
          checked={checked === value.item}
        />
        {value.item}
      </label>
    );
  });
};
//レンダリングするコンポーネントの外側
//状態管理やそれに伴うonChangeイベントの定義など
//実際レンダリングされる中身は別で、繰り返し処理を用いている
//中身自体は別のため、ここで定義したイベントなどを改めて子コンポーネントで受け取る必要がある
//それがRadioBtnItems
const InputRadio = () => {
  //ラジオボタンの状態関数とそれを管理する関数をuseStateで定義
  //初期値はvaluesの最初のオブジェクトのitemプロパティ
  const [checkedValue, setCheckedValue] = useState(values[0]["item"]);

  //状態管理変数を変更する関数を定義
  //onChangeイベントハンドラー配下へ
  //今回はラジオボタンのチェックが代わるとそれを受け取る
  //statmentが単一業のためかっこと、returnを省略
  const handleChange = (e) => setCheckedValue(e.target.value);

  return (
    <div className="App">
      <p>
        現在選択されている値 :<b>{checkedValue}</b>
      </p>
      <RadioBtnItems onChange={handleChange} checked={checkedValue} />
    </div>
  );
};

//親コンポーネントからonChangeイベントの関数とcheckedプロパティを受け取る

export default function App() {
  return <InputRadio />;
}
