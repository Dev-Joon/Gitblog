import { reactive, onMounted } from 'vue';

export function useProfile(username = 'Dev-Joon') {
  const profile = reactive({
    name: '',
    bio: '',
    avatar: '',
    url: '',
    loading: true
  });

  onMounted(async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      profile.name = data.name || data.login;
      profile.bio = data.bio || "Hello, World!";
      profile.avatar = data.avatar_url;
      profile.url = data.html_url;
    } catch (e) {
      console.error("프로필 로드 실패:", e);
    } finally {
      profile.loading = false;
    }
  });

  return { profile };
}