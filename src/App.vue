<template>
  <div class="container global-container">
    <div class="row">
      <keep-alive include="Main">
        <router-view name="main"></router-view>
      </keep-alive>
    </div>
    <BackTop></BackTop>
  </div>
</template>
