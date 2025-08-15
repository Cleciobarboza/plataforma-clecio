interface UserPreferences {
  userImageUrl: string;
  userTheme: 'dark' | 'light';
  bannerColor: string; // Ex: '#ff0000' ou nome de tema
}

const preferences: UserPreferences = {
  userImageUrl: 'https://meuservidor.com/imagens/user123.png',
  userTheme: 'dark',
  bannerColor: 'roxo'
};

localStorage.setItem('userPreferences', JSON.stringify(preferences));
