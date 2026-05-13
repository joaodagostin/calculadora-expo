import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { PaperProvider, Text } from "react-native-paper";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [novoValor, setNovoValor] = useState(false);

  function adicionarNumero(numero) {
    if (novoValor) {
      setDisplay(numero);
      setNovoValor(false);
      return;
    }

    setDisplay(display === "0" ? numero : display + numero);
  }

  function adicionarDecimal() {
    if (novoValor) {
      setDisplay("0.");
      setNovoValor(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function limpar() {
    setDisplay("0");
    setValorAnterior(null);
    setOperador(null);
    setNovoValor(false);
  }

  function apagarUltimo() {
    setDisplay(display.length <= 1 ? "0" : display.slice(0, -1));
  }

  function calcular(v1, v2, op) {
    const n1 = parseFloat(v1);
    const n2 = parseFloat(v2);

    switch (op) {
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
      case "*":
        return n1 * n2;
      case "/":
        return n2 === 0 ? "Erro" : n1 / n2;
      default:
        return n2;
    }
  }

  function escolherOperador(op) {
    if (operador && !novoValor) {
      const resultado = calcular(valorAnterior, display, operador);
      setDisplay(String(resultado));
      setValorAnterior(String(resultado));
    } else {
      setValorAnterior(display);
    }

    setOperador(op);
    setNovoValor(true);
  }

  function resultadoFinal() {
    if (!operador || valorAnterior === null) return;

    const resultado = calcular(valorAnterior, display, operador);

    setDisplay(String(resultado));
    setValorAnterior(null);
    setOperador(null);
    setNovoValor(true);
  }

  function Botao({ texto, onPress, tipo = "numero", largo = false }) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.botao,
          largo && styles.botaoLargo,
          tipo === "operador" && styles.botaoOperador,
          tipo === "acao" && styles.botaoAcao,
          tipo === "igual" && styles.botaoOperador,
          pressed && styles.botaoPressionado,
        ]}
      >
        <Text
          style={[
            styles.textoBotao,
            tipo === "acao" && styles.textoAcao,
            tipo === "operador" && styles.textoOperador,
            tipo === "igual" && styles.textoOperador,
          ]}
        >
          {texto}
        </Text>
      </Pressable>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.calculadora}>
          
          <View style={styles.display}>
            <Text style={styles.operacao}>
              {valorAnterior && operador
                ? `${valorAnterior} ${
                    operador === "*"
                      ? "×"
                      : operador === "/"
                      ? "÷"
                      : operador
                  }`
                : ""}
            </Text>

            <Text style={styles.resultado} numberOfLines={1}>
              {display}
            </Text>
          </View>

          <View style={styles.teclado}>
            <View style={styles.linha}>
              <Botao texto="C" onPress={limpar} tipo="acao" />
              <Botao texto="⌫" onPress={apagarUltimo} tipo="acao" />
              <Botao
                texto="÷"
                onPress={() => escolherOperador("/")}
                tipo="operador"
              />
            </View>

            <View style={styles.linha}>
              <Botao texto="7" onPress={() => adicionarNumero("7")} />
              <Botao texto="8" onPress={() => adicionarNumero("8")} />
              <Botao texto="9" onPress={() => adicionarNumero("9")} />
              <Botao
                texto="×"
                onPress={() => escolherOperador("*")}
                tipo="operador"
              />
            </View>

            <View style={styles.linha}>
              <Botao texto="4" onPress={() => adicionarNumero("4")} />
              <Botao texto="5" onPress={() => adicionarNumero("5")} />
              <Botao texto="6" onPress={() => adicionarNumero("6")} />
              <Botao
                texto="-"
                onPress={() => escolherOperador("-")}
                tipo="operador"
              />
            </View>

            <View style={styles.linha}>
              <Botao texto="1" onPress={() => adicionarNumero("1")} />
              <Botao texto="2" onPress={() => adicionarNumero("2")} />
              <Botao texto="3" onPress={() => adicionarNumero("3")} />
              <Botao
                texto="+"
                onPress={() => escolherOperador("+")}
                tipo="operador"
              />
            </View>

            <View style={styles.linha}>
              <Botao
                texto="0"
                onPress={() => adicionarNumero("0")}
                largo
              />
              <Botao texto="." onPress={adicionarDecimal} />
              <Botao
                texto="="
                onPress={resultadoFinal}
                tipo="igual"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  calculadora: {
    width: "100%",
    maxWidth: 420,
    padding: 15,
  },

  display: {
    minHeight: 180,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  operacao: {
    color: "#888",
    fontSize: 22,
    marginBottom: 10,
  },

  resultado: {
    color: "#fff",
    fontSize: 72,
    fontWeight: "300",
  },

  teclado: {
    gap: 12,
  },

  linha: {
    flexDirection: "row",
    gap: 12,
  },

  botao: {
    flex: 1,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoLargo: {
    flex: 2.15,
    alignItems: "flex-start",
    paddingLeft: 32,
  },

  botaoOperador: {
    backgroundColor: "#ff9f0a",
  },

  botaoAcao: {
    backgroundColor: "#a5a5a5",
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 40,
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  textoAcao: {
    color: "#000",
    fontSize: 28,
  },

  textoOperador: {
    color: "#fff",
    fontSize: 36,
  },
});