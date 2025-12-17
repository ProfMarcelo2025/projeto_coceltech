/* * MOTOR DE CÁLCULO FINANCEIRO & ESG
 * Atualizado com: Animação Suave (Slow Motion) + Gatilho de Rolagem
 */

const DATA = {
    // --- CONFIGURAÇÕES GERAIS ---
    qtd_veiculos: 2,
    periodo_anos: 5,
    
    // --- PREMISSAS AMBIENTAIS ---
    preco_gasolina_medio: 5.89,
    fator_emissao_gasolina: 2.27,
    
    // --- CENÁRIO 1: VEÍCULO A COMBUSTÃO (VUC) ---
    vuc_preco_unit: 78690.00,
    vuc_combustivel_ano: 15000.00,
    vuc_manutencao_ano: 3500.00,
    vuc_depreciacao: 0.25,

    // --- CENÁRIO 2: VEÍCULO ELÉTRICO (EV) ---
    ev_preco_unit: 99990.00,
    ev_carregador_total: 50000.00,
    ev_energia_ano: 0.00,
    ev_manutencao_ano: 1000.00,
    ev_depreciacao: 0.15,

    // --- INVESTIMENTOS ESTRATÉGICOS (P&D) ---
    capex_infra: 120000.00,
    capex_bolsas: 300000.00,
    capex_software: 70000.00,
};

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. CÁLCULOS (Matemática pura, acontece instantaneamente) ---
    const vuc_capex_frota = DATA.vuc_preco_unit * DATA.qtd_veiculos;
    const ev_capex_frota = DATA.ev_preco_unit * DATA.qtd_veiculos;
    const ev_capex_total_ativos = ev_capex_frota + DATA.ev_carregador_total;

    const vuc_opex_combustivel = DATA.vuc_combustivel_ano * DATA.periodo_anos * DATA.qtd_veiculos;
    const vuc_opex_manutencao = DATA.vuc_manutencao_ano * DATA.periodo_anos * DATA.qtd_veiculos;
    
    const ev_opex_energia = DATA.ev_energia_ano * DATA.periodo_anos * DATA.qtd_veiculos;
    const ev_opex_manutencao = DATA.ev_manutencao_ano * DATA.periodo_anos * DATA.qtd_veiculos;

    const vuc_residual = vuc_capex_frota * (1 - DATA.vuc_depreciacao);
    const ev_residual = ev_capex_total_ativos * (1 - DATA.ev_depreciacao);

    const vuc_tco_total = (vuc_capex_frota + vuc_opex_combustivel + vuc_opex_manutencao) - vuc_residual;
    const ev_tco_total = (ev_capex_total_ativos + ev_opex_energia + ev_opex_manutencao) - ev_residual;

    const economia_anual = ((DATA.vuc_combustivel_ano + DATA.vuc_manutencao_ano) - (DATA.ev_energia_ano + DATA.ev_manutencao_ano)) * DATA.qtd_veiculos;
    const economia_tco_5anos = vuc_tco_total - ev_tco_total;
    
    const projeto_total = DATA.capex_infra + ev_capex_total_ativos + DATA.capex_bolsas + DATA.capex_software;

    const delta_investimento = ev_capex_total_ativos - vuc_capex_frota;
    const payback_meses = parseFloat((delta_investimento / (economia_anual / 12)).toFixed(0));

    // Cálculos Ambientais
    const gasto_total_combustivel = DATA.vuc_combustivel_ano * DATA.periodo_anos * DATA.qtd_veiculos;
    const litros_total = gasto_total_combustivel / DATA.preco_gasolina_medio;
    const co2_evitado_ton = (litros_total * DATA.fator_emissao_gasolina) / 1000;


    // --- 2. PREPARAÇÃO DAS ANIMAÇÕES ---
    // Agora cada animação só dispara quando o usuário VER o número

    // TABELA TCO
    queueAnimation('tco-vuc-capex', vuc_capex_frota, 'currency');
    queueAnimation('tco-ev-capex', ev_capex_total_ativos, 'currency');
    
    queueAnimation('tco-vuc-fuel', vuc_opex_combustivel, 'currency');
    queueAnimation('tco-ev-fuel', ev_opex_energia, 'currency');
    
    queueAnimation('tco-vuc-maint', vuc_opex_manutencao, 'currency');
    queueAnimation('tco-ev-maint', ev_opex_manutencao, 'currency');
    
    queueAnimation('tco-vuc-residual', vuc_residual, 'currency', '- ');
    queueAnimation('tco-ev-residual', ev_residual, 'currency', '- ');
    
    queueAnimation('tco-vuc-total', vuc_tco_total, 'currency');
    queueAnimation('tco-ev-total', ev_tco_total, 'currency');
    
    queueAnimation('tco-economia-conclusao', economia_tco_5anos, 'currency');

    // KPIS FINANCEIROS
    queueAnimation('kpi-investimento-total', projeto_total, 'currency');
    queueAnimation('kpi-payback', payback_meses, 'integer', '', ' Meses');
    queueAnimation('kpi-economia-anual', economia_anual, 'currency');

    // DETALHAMENTO (CAPEX)
    queueAnimation('det-infra', DATA.capex_infra, 'currency');
    queueAnimation('det-infra-pct', (DATA.capex_infra / projeto_total) * 100, 'percent');

    queueAnimation('det-ativos', ev_capex_total_ativos, 'currency');
    queueAnimation('det-ativos-pct', (ev_capex_total_ativos / projeto_total) * 100, 'percent');

    queueAnimation('det-bolsas', DATA.capex_bolsas, 'currency');
    queueAnimation('det-bolsas-pct', (DATA.capex_bolsas / projeto_total) * 100, 'percent');

    queueAnimation('det-soft', DATA.capex_software, 'currency');
    queueAnimation('det-soft-pct', (DATA.capex_software / projeto_total) * 100, 'percent');

    queueAnimation('det-total-final', projeto_total, 'currency');

    // IDS DA INDEX (HOME)
    if(document.getElementById('idx-economia-valor')) {
        queueAnimation('idx-economia-valor', economia_tco_5anos, 'currency_clean');
    }
    if(document.getElementById('idx-co2-valor')) {
        queueAnimation('idx-co2-valor', co2_evitado_ton, 'float1');
    }
    if(document.getElementById('idx-payback-meses')) {
        queueAnimation('idx-payback-meses', payback_meses, 'integer');
    }

});

// --- FUNÇÃO INTELIGENTE: SÓ ANIMA QUANDO APARECE NA TELA ---
function queueAnimation(id, endValue, formatType, prefix = '', suffix = '') {
    const element = document.getElementById(id);
    if (!element) return;

    // Configuração do Observador (Dispara quando 10% do elemento está visível)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // O elemento apareceu! Começa a contar.
                startCounting(element, endValue, formatType, prefix, suffix);
                observer.unobserve(element); // Para de observar (executa só uma vez)
            }
        });
    }, { threshold: 0.1 });

    observer.observe(element);
}

// --- MOTOR DA ANIMAÇÃO (AGORA MAIS LENTO) ---
function startCounting(obj, endValue, formatType, prefix, suffix) {
    
    // AQUI ESTÁ O AJUSTE DE VELOCIDADE:
    // Mudei para 4500ms (4.5 segundos). Se quiser mais lento, aumente este número.
    const duration = 2000; 
    
    const startValue = 0;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing (Começa rápido, termina beeeem devagar para dar suspense)
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        const currentProgress = easeOutQuart(progress);

        const currentValue = startValue + (currentProgress * (endValue - startValue));

        obj.innerHTML = prefix + formatValue(currentValue, formatType) + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Garante valor final exato
            obj.innerHTML = prefix + formatValue(endValue, formatType) + suffix;
        }
    }

    window.requestAnimationFrame(step);
}

// FORMATADOR
function formatValue(val, type) {
    if (type === 'currency') {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    if (type === 'currency_clean') {
        return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (type === 'percent') {
        return val.toFixed(1) + "%";
    }
    if (type === 'integer') {
        return Math.floor(val).toString();
    }
    if (type === 'float1') {
        return val.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    return val;
}