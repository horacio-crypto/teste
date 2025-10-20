# Google Analytics Setup Guide

## 📊 Configuração do Google Analytics

### Passo 1: Criar Conta no Google Analytics
1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie uma conta Google Analytics
3. Configure uma propriedade GA4
4. Anote o **Measurement ID** (formato: G-XXXXXXXXXX)

### Passo 2: Configurar Google Tag Manager (Opcional)
1. Acesse [tagmanager.google.com](https://tagmanager.google.com)
2. Crie um container
3. Anote o **Container ID** (formato: GTM-XXXXXXX)

### Passo 3: Atualizar o Código
No arquivo `index.html`, substitua:
- `G-XXXXXXXXXX` pelo seu Measurement ID
- `GTM-XXXXXXX` pelo seu Container ID (se usar GTM)

### Passo 4: Verificar Instalação
1. Publique o site
2. Acesse Google Analytics > Relatórios > Tempo real
3. Navegue pelo site para ver dados em tempo real

## 🎯 Eventos Rastreados

### Eventos Automáticos:
- **button_click**: Cliques em botões principais
- **project_view**: Visualizações de projetos
- **social_click**: Cliques em redes sociais
- **whatsapp_click**: Cliques no WhatsApp
- **chatbot_open**: Abertura do chatbot
- **form_submit**: Envios do formulário
- **scroll_depth**: Profundidade de scroll (25%, 50%, 75%, 100%)
- **section_view**: Visualizações de seções

### Parâmetros Personalizados:
- **button_text**: Texto do botão clicado
- **button_location**: Seção onde está o botão
- **project_name**: Nome do projeto visualizado
- **platform**: Rede social clicada
- **percent**: Porcentagem de scroll
- **section_name**: Nome da seção visualizada

## 📈 Relatórios Úteis

### No Google Analytics:
1. **Tempo Real** → Ver visitantes ativos
2. **Aquisição** → Como chegam ao site
3. **Engajamento** → Páginas mais visitadas
4. **Eventos** → Interações personalizadas
5. **Conversões** → Formulários enviados

### Métricas Importantes:
- Taxa de rejeição
- Tempo na página
- Páginas por sessão
- Conversões de contato
- Origem do tráfego

## 🔒 Privacidade e LGPD

### Configurações Implementadas:
- `anonymize_ip: true` - Anonimiza IPs
- `allow_google_signals: false` - Desabilita sinais do Google
- `cookie_flags: 'SameSite=None;Secure'` - Cookies seguros

### Para Compliance Total:
1. Adicione banner de cookies
2. Implemente opt-out
3. Atualize política de privacidade
4. Configure retenção de dados

## 🚀 Próximos Passos

1. ✅ Google Analytics configurado
2. ⏳ Configurar Google Search Console
3. ⏳ Adicionar Hotjar para heatmaps
4. ⏳ Implementar A/B testing
5. ⏳ Configurar alertas personalizados

---

**Nota**: Substitua os IDs de exemplo pelos seus IDs reais antes de publicar!