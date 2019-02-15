<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <a href="#" v-on:click="home" class="brand hightlight animated nfinite flipInY delay-2s slow">
          <!-- <img src="../../../assets/images/icons8-coollector-48.png" alt=""/> -->  Subaru Store
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    home: function () {
      this.$router.push('/');
    }
  }
}
</script>