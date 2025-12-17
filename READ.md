# ⚡ Projeto Eletroposto Solar: Dashboard de Viabilidade & ESG

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Tech](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-blue)
![Focus](https://img.shields.io/badge/Foco-Engenharia%20Financeira%20%26%20Sustentabilidade-green)

> **Uma interface web inteligente para simulação financeira (TCO) e impacto ambiental de frotas elétricas em projetos de P&D ANEEL.**

---

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como a interface de apresentação para uma proposta de **P&D (Pesquisa e Desenvolvimento)** focada na transição energética (Mobilidade Elétrica + Energia Solar).

Diferente de um site estático comum, esta aplicação atua como um **Simulador Financeiro em Tempo Real**. Ela renderiza os dados de viabilidade econômica e ambiental baseando-se em premissas matemáticas editáveis, garantindo que os *stakeholders* (Prefeitura/Concessionária) visualizem sempre dados precisos e calculados na hora.

## 🚀 Funcionalidades Principais

### 1. 🧠 "Motor Oculto" de Cálculo (`financeiro.js`)
Toda a lógica de negócios está desacoplada do HTML. Um arquivo centralizado gerencia as premissas:
* **Cálculo de TCO (Total Cost of Ownership):** Compara CAPEX e OPEX de veículos a combustão vs. elétricos em 5 anos.
* **Payback Marginal:** Calcula em quanto tempo a diferença de investimento se paga com a economia operacional.
* **Impacto ESG:** Converte a economia de combustível em **Toneladas de CO2 evitadas** (baseado no GHG Protocol).

### 2. 🎬 UX & Data Storytelling
* **Animações "Count Up":** Os números financeiros não aparecem estáticos; eles "contam" progressivamente para dar dimensão ao valor economizado.
* **Scroll Trigger (Intersection Observer):** As animações só disparam quando o usuário rola a tela e visualiza o gráfico, garantindo o impacto visual no momento certo.
* **Design Responsivo:** Layout fluido utilizando CSS Grid e Flexbox modernos.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estrutura clara e acessível.
* **CSS3 Moderno:** Uso extensivo de *CSS Variables* (`var(--primary-color)`) para fácil manutenção de tema.
* **Vanilla JavaScript (ES6+):**
    * Sem dependências externas (jQuery Free).
    * Uso de `IntersectionObserver API` para performance.
    * Manipulação de DOM reativa baseada em IDs.

---

## ⚙️ Como Configurar a Simulação

O projeto foi desenhado para ser flexível. Para alterar o cenário da proposta (ex: mudar o preço da gasolina ou o modelo do carro), não é necessário editar o HTML.

1. Abra o arquivo `assets/js/financeiro.js`.
2. Edite o objeto `DATA` no topo do arquivo:

```javascript
const DATA = {
    qtd_veiculos: 5,               // Aumente a frota aqui
    preco_gasolina_medio: 6.10,    // Atualize o preço do combustível
    vuc_preco_unit: 85000.00,      // Atualize o preço do carro a combustão
    // ... o sistema recalcula TCO, Payback e CO2 automaticamente.
};