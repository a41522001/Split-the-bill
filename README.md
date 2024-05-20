<h1>分帳應用程式</h1>

  <p>這是一個使用 Vue 3 Composition API 開發的分帳應用程式，並使用 Vue Router 來實現單頁應用程式 (SPA) 的頁面切換。本應用程式提供簡單易用的介面，幫助用戶輕鬆管理群組的費用分攤。</p>

  <h2>功能介紹</h2>
  <ul>
    <li><strong>Home 頁面</strong>：應用程式的主頁面，展示基本功能入口。</li>
    <li><strong>建立群組頁面</strong>：用戶可以在此頁面建立新的分帳群組。</li>
    <li><strong>群組頁面</strong>：展示群組內所有成員的款項記錄及最後的分帳明細。</li>
    <li><strong>建立款項頁面</strong>：用戶可以在此頁面新增新的款項。</li>
  </ul>

  <h2>狀態管理</h2>
  <p>使用 Pinia 作為狀態管理工具，管理所有與分帳相關的邏輯，包括：</p>
  <ul>
    <li>新增成員</li>
    <li>新增款項</li>
    <li>計算各成員的餘額</li>
    <li>結束分帳</li>
    <li>刪除款項</li>
    <li>刪除成員</li>
  </ul>

  <h2>技術</h2>
  <ul>
    <li><strong>Vue 3</strong>：使用 Composition API 來開發應用程式，讓代碼更具模組化和可讀性。</li>
    <li><strong>Vue Router</strong>：實現頁面之間的切換，構建單頁應用程式 (SPA)。</li>
    <li><strong>Pinia</strong>：作為應用程式的狀態管理工具，管理分帳邏輯和應用狀態。</li>
  </ul>