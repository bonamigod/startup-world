# Evony Scout (protótipo)

Painel que fica ao lado do Evony no PC, lê a tela do jogo e lista os alvos
que aparecem no mapa, com coordenada, distância até a sua cidade e alerta
sonoro para os alvos marcados como prioridade.

## O que ele faz e o que não faz

- **Faz:** captura a imagem da janela do jogo, reconhece os alvos que você
  ensinou (templates), calcula a coordenada de cada um e monta a lista.
- **Não faz:** não clica, não digita, não move o mapa, não lê memória nem
  tráfego do jogo e não se esconde. **Você arrasta o mapa; ele registra o
  que passar pela tela.**

Mesmo sendo só leitura de tela, os termos do Evony restringem software de
terceiros. O uso é por sua conta e risco.

## Instalação (Windows)

1. Instale o Python 3.10+ (marque "Add to PATH").
2. Opcional, para ler coordenadas e níveis automaticamente: instale o
   Tesseract OCR e deixe-o no PATH.
3. Na pasta `evony-scout`:

```
pip install -r requirements.txt
copy config.example.json config.json
```

## Primeiro uso

1. **Ensine os alvos.** Com o mapa do jogo aberto e um alvo visível:

   ```
   python tools/recortar_template.py boss
   ```

   Arraste um retângulo só em volta do corpo do alvo e aperte ENTER. Repita
   para cada tipo (`monstro`, `inimigo`, ...). Vários recortes do mesmo tipo
   melhoram o acerto (`boss__2.png`, `boss__3.png` são criados sozinhos).

2. **Ajuste o `config.json`:**

   | Campo | O que é |
   |---|---|
   | `minha_cidade` | Coordenada da sua cidade, para calcular a distância |
   | `mapa.tile_largura_px` / `tile_altura_px` | Tamanho em pixels do losango de 1 quadrado do mapa no zoom que você usa |
   | `mapa.inverter_eixos` | `true` se X e Y saírem trocados |
   | `mapa.regiao_coordenadas` | `[x, y, largura, altura]` do texto de coordenadas na janela, para o OCR |
   | `deteccao.rotulo_nivel` | `[dx, dy, largura, altura]` do rótulo de nível em relação ao centro do alvo |
   | `deteccao.limiar` | 0 a 1. Suba se aparecer alvo falso, desça se deixar passar |
   | `deteccao.reducao` | 0.5 é rápido; 1.0 é mais preciso |
   | `prioridades` | Regras que disparam o som e o destaque |

3. **Rode:**

   ```
   python -m scout.app
   ```

   Deixe a janela do jogo visível (não minimizada) e arraste o mapa. Se o
   OCR das coordenadas não estiver configurado, digite a coordenada do
   centro da tela no campo "Centro da tela X,Y".

## Usando

- Alvos prioritários aparecem no topo, em amarelo, e tocam um som na
  primeira vez que são vistos.
- Os demais ficam ordenados do mais próximo ao mais distante.
- Duplo clique numa linha copia a coordenada.
- "Exportar CSV" salva a lista.
- Alvos não vistos há 30 minutos saem da lista.

## Calibração do mapa

Vá até um ponto de coordenada conhecida, centralize-o e confira a coordenada
que o Scout dá para um alvo cuja posição você sabe. Se errar por um fator
constante, ajuste `tile_largura_px`/`tile_altura_px`; se X e Y vierem
trocados, use `inverter_eixos`. Mantenha sempre o mesmo zoom dos recortes.

## Testes

```
python -m pytest tests
```

Os testes usam imagens sintéticas. **O protótipo ainda não foi testado
contra o jogo real**: limiar, tamanho do tile e regiões de OCR precisam ser
calibrados na sua tela.
