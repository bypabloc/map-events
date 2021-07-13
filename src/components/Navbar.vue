<template>
    <nav :class="'row navbar navbar-expand-lg theme-'+[theme]+'-800'">
        <div class="container-fluid">
            <router-link to="/" :class="'navbar-brand theme-color-'+[theme]+'-200'">Template CV</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <template v-if="user.loggedIn">
                        <router-link to="dashboard"
                            :class="'nav-link theme-color-'+[theme]+'-200'"
                        >Dashboard</router-link>
                        <li class="nav-item dropdown">
                            <a :class="'link-secondary nav-link dropdown-toggle theme-color-'+[theme]+'-200'" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{user.data.displayName}}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <router-link to="config"
                                        :class="'dropdown-item theme-color-'+[theme]+'-700'"
                                    >Config</router-link>
                                </li>
                                <li>
                                    <a :class="'dropdown-item theme-color-'+[theme]+'-700'" href="#" @click.prevent="fetchLogout">Sign out</a>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li :class="'nav-item theme-color-'+[theme]+'-200'">
                            <router-link to="login"
                                :class="'nav-link theme-color-'+[theme]+'-200'"
                            >Login</router-link>
                        </li>
                        <li :class="'nav-item theme-color-'+[theme]+'-200'">
                            <router-link to="register" 
                                :class="'nav-link theme-color-'+[theme]+'-200'"
                            >Register</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user",
            theme: "theme",
        })
    },
    methods: {
        ...mapActions([
            'fetchLogout',
        ]),
    }
};
</script>