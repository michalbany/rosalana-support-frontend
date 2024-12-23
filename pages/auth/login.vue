<script setup lang="ts">
  useHead({
    title: "Login",
  });

  const form = reactive({
    email: "",
    password: "",
  });

  const submit = () => {
    // console.log(form);
    sendLogin();
  };

  const onTest = async () => {
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    const raToken = useCookie("RA-TOKEN").value as string;

    try {
        const response = await $fetch("/test", {
            method: "GET",
            credentials: 'include',
            baseURL: "http://localhost:8001",
            headers: {
                'X-XSRF-TOKEN': xsrfValue,
                Accept: "application/json",
                Authorization: `Bearer ${raToken}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
  };

  const sendLogin = async () => {
    try {
      const response = await $fetch("sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
        baseURL: "http://localhost:8001",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    const raToken = useCookie("RA-TOKEN").value as string;
    try {
      const response = await $fetch("/login", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
          Authorization: `Bearer ${raToken}`,
        },
        body: JSON.stringify(form),
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

//   onMounted(async () => {
//     const raToken = useCookie("RA-TOKEN").value as string;
//     try {
//       const response = await $fetch("/user", {
//         method: "GET",
//         credentials: "include",
//         baseURL: "http://localhost:8001",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${raToken}`,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });

  //   onMounted(async () => {
  //     try {
  //       const response = await $fetch("sanctum/csrf-cookie", {
  //         method: "GET",
  //         credentials: 'include',
  //         baseURL: "http://localhost:8001",
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     const xsrfValue = useCookie('XSRF-TOKEN').value as string;
  //     try {
  //       const response = await $fetch("/test", {
  //         method: "POST",
  //         credentials: 'include',
  //         baseURL: "http://localhost:8001",
  //         headers: {
  //           'X-XSRF-TOKEN': xsrfValue,
  //         },
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });
</script>
<template>
  <NuxtLayout name="auth">
    <template #title>
      <h1 class="text-3xl font-bold">Login</h1>
      <p class="text-xs">Welcome back! Please login to your account.</p>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <UiInput type="email" v-model="form.email" placeholder="Email" />
      <UiInput type="password" v-model="form.password" placeholder="Password" />

      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <UiCheckbox disabled id="remember-me" />
          <UiLabel for="remember-me" class="text-xs">Remember me</UiLabel>
        </div>
        <UiButton disabled type="button" variant="link" size="sm" class="h-auto p-0 text-xs"
          >Forget password?</UiButton
        >
      </div>

      <UiButton type="submit">Login</UiButton>
    </form>


    <UiButton size="sm" variant="secondary" class="mt-8" @click="onTest">Test</UiButton>
  </NuxtLayout>
</template>
