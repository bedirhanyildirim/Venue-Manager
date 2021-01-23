<template>
<div id="createCompany">
  <container display="flex" justify-content="left" flex-direction="column">
    <div class="wrapper">
      <div class="form">
        <h1 class="welcome">Create your company</h1>
        <companyForm></companyForm>
      </div>
      <div class="illustration">
        <img class="login-illustration" src="../assets/illustrations/login.jpg" alt="">
      </div>
    </div>
  </container>
</div>
</template>
<script>
import router from '@/router';
import { mapGetters } from 'vuex';
import container from '../components/container'
import aboutMe from '../components/aboutme.profile'
import companyForm from '../components/form.createCompany'

export default {
  name: 'createCompany.pages',
  components: { container, aboutMe, companyForm },
  computed: {
    ...mapGetters([
      'getCompany'
    ])
  },
  created() {
    if (this.getCompany) {
      router.push('/company')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .wrapper {
    width: 100%;
    display: flex;
    padding: 50px 0;
    align-items: center;
    justify-content: space-evenly;
  }
  .wrapper {
    .form {
      transition: opacity 1s ease-out;
      max-width: 400px;
    }
    .form {
      .welcome {
        color: #000000;
        font-size: 24px;
        text-align: left;
        font-weight: 700;
        margin-bottom: 30px;
        font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      }
    }
    .illustration {
      overflow: hidden;
      max-width: 400px;
    }
    .illustration {
      .login-illustration {
        width: 100%;
      }
      .signup-illustration {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .container {
    .wrapper {
      display: flex;
      padding: 24px 0;
      align-items: center;
      justify-content: center;
    }
    .wrapper {
      .forms {
        width: 100%;
      }
      .illustration {
        display: none;
      }
    }
  }
}
</style>