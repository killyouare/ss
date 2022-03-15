<template>
  <header>
    <article>
      <img src="../assets/img/logo.png" alt="logo" />
    </article>
    <nav>
      <router-link to="/workers">Сотрудники</router-link>
      <router-link to="/shifts">Смены</router-link>
      <router-link to="/orders">Заказы</router-link>
      <router-link to="/login">Вход</router-link>
      <a href="#" class="cancel_button">Выход</a>
    </nav>
  </header>
</template>

<script>
export default {};
</script>
