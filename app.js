new Vue({
    el: '#app',
    data: {
        repos: []
    },
    created() {
        this.fetchRepos();
    },
    methods: {
        async fetchRepos() {
            try {
                const response = await fetch('https://api.github.com/users/jimmy-shian/repos');
                this.repos = await response.json();
            } catch (error) {
                console.error('Error fetching repos:', error);
            }
        }ASFAF
    }
});841949849