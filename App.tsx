import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function convertTemperature() {
    Keyboard.dismiss();

    if (!celsius.trim()) {
      setFahrenheit(null);
      setError('Enter a temperature in Celsius to get started.');
      return;
    }

    const value = Number(celsius);
    if (!Number.isFinite(value)) {
      setFahrenheit(null);
      setError('Enter a valid temperature, like -10 or 21.5.');
      return;
    }

    const converted = (value * 9) / 5 + 32;
    if (!Number.isFinite(converted)) {
      setFahrenheit(null);
      setError('That temperature is too large to convert.');
      return;
    }

    setError(null);
    setFahrenheit(converted);
  }

  function handleCelsiusChange(value: string) {
    setCelsius(value);
    setFahrenheit(null);
    setError(null);
  }

  const formattedFahrenheit =
    fahrenheit === null
      ? null
      : Number(fahrenheit.toFixed(1)).toString();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.brand}>
                  <View style={styles.brandMark}>
                    <Text style={styles.brandMarkText}>°</Text>
                  </View>
                  <View>
                    <Text style={styles.brandName}>TEMPO</Text>
                    <Text style={styles.brandCaption}>TEMPERATURE TOOLS</Text>
                  </View>
                </View>
                <View style={styles.unitBadge}>
                  <Text style={styles.unitBadgeText}>°C  →  °F</Text>
                </View>
              </View>

              <View style={styles.intro}>
                <Text style={styles.eyebrow}>A QUICK CONVERSION</Text>
                <Text style={styles.title}>A little warmer.</Text>
                <Text style={styles.subtitle}>
                  Celsius in, Fahrenheit out. Nice and simple.
                </Text>
              </View>

              <View style={styles.formula}>
                <Text style={styles.formulaLabel}>THE FORMULA</Text>
                <Text style={styles.formulaText}>°F = (°C × 9/5) + 32</Text>
              </View>

              <View style={styles.inputCard}>
                <Text style={styles.fieldLabel}>TEMPERATURE IN CELSIUS</Text>
                <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
                  <TextInput
                    accessibilityLabel="Temperature in Celsius"
                    accessibilityHint="Enter a temperature, then tap Convert."
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={
                      Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'
                    }
                    onChangeText={handleCelsiusChange}
                    onSubmitEditing={convertTemperature}
                    placeholder="0"
                    placeholderTextColor="#A6ADA8"
                    returnKeyType="done"
                    style={styles.input}
                    value={celsius}
                  />
                  <View style={styles.inputUnit}>
                    <Text style={styles.inputUnitText}>°C</Text>
                  </View>
                </View>
                {error ? (
                  <Text accessibilityRole="alert" style={styles.errorText}>
                    {error}
                  </Text>
                ) : (
                  <Text style={styles.fieldHint}>
                    Negative and decimal values work too.
                  </Text>
                )}
                <Pressable
                  accessibilityRole="button"
                  onPress={convertTemperature}
                  style={({ pressed }) => [
                    styles.convertButton,
                    pressed ? styles.convertButtonPressed : null,
                  ]}
                >
                  <Text style={styles.convertButtonText}>
                    Convert to Fahrenheit
                  </Text>
                  <Text style={styles.convertButtonArrow}>→</Text>
                </Pressable>
              </View>

              <View
                accessibilityLiveRegion="polite"
                style={[
                  styles.resultCard,
                  fahrenheit !== null ? styles.resultCardReady : null,
                ]}
              >
                <View style={styles.resultTopRow}>
                  <Text style={styles.resultLabel}>YOUR FAHRENHEIT RESULT</Text>
                  <View
                    style={[
                      styles.resultDot,
                      fahrenheit !== null ? styles.resultDotReady : null,
                    ]}
                  />
                </View>
                <View style={styles.resultValueRow}>
                  <Text
                    accessibilityLabel={
                      formattedFahrenheit === null
                        ? 'No converted result yet'
                        : `${formattedFahrenheit} degrees Fahrenheit`
                    }
                    style={[
                      styles.resultValue,
                      fahrenheit !== null ? styles.resultValueReady : null,
                    ]}
                  >
                    {formattedFahrenheit ?? '—'}
                  </Text>
                  <Text
                    style={[
                      styles.resultUnit,
                      fahrenheit !== null ? styles.resultUnitReady : null,
                    ]}
                  >
                    °F
                  </Text>
                </View>
                <Text style={styles.resultNote}>
                  {fahrenheit === null
                    ? 'Your converted temperature will appear here.'
                    : `${celsius.trim()}°C converted to Fahrenheit`}
                </Text>
              </View>

              <View style={styles.tip}>
                <View style={styles.tipIcon}>
                  <Text style={styles.tipIconText}>i</Text>
                </View>
                <Text style={styles.tipText}>
                  <Text style={styles.tipStrong}>Quick reference </Text>
                  Water freezes at 0°C (32°F).
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7F2',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  header: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4F0E7',
  },
  brandMarkText: {
    color: '#286444',
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '700',
  },
  brandName: {
    color: '#1C2B23',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  brandCaption: {
    marginTop: 3,
    color: '#77837B',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  unitBadge: {
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  unitBadgeText: {
    color: '#52665A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  intro: {
    marginTop: 26,
    marginBottom: 20,
  },
  eyebrow: {
    color: '#478263',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  title: {
    marginTop: 9,
    color: '#1D2D24',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
    letterSpacing: -1.5,
  },
  subtitle: {
    marginTop: 8,
    color: '#718078',
    fontSize: 15,
    lineHeight: 22,
  },
  formula: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: '#EAF0E9',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
  },
  formulaLabel: {
    color: '#718078',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  formulaText: {
    color: '#365B45',
    fontSize: 13,
    fontWeight: '700',
  },
  inputCard: {
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    padding: 21,
    shadowColor: '#26372B',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 3,
  },
  fieldLabel: {
    color: '#607067',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  inputRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECE8',
    marginTop: 7,
  },
  inputRowError: {
    borderBottomColor: '#C95545',
  },
  input: {
    flex: 1,
    color: '#203128',
    fontSize: 44,
    lineHeight: 54,
    fontWeight: '600',
    paddingVertical: 7,
  },
  inputUnit: {
    borderRadius: 11,
    backgroundColor: '#F0F4EF',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputUnitText: {
    color: '#456650',
    fontSize: 15,
    fontWeight: '700',
  },
  fieldHint: {
    marginTop: 10,
    color: '#87928B',
    fontSize: 12,
  },
  errorText: {
    marginTop: 10,
    color: '#AD4438',
    fontSize: 12,
  },
  convertButton: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#285B43',
    marginTop: 19,
    paddingHorizontal: 18,
  },
  convertButtonPressed: {
    backgroundColor: '#1F4C36',
    transform: [{ scale: 0.99 }],
  },
  convertButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  convertButtonArrow: {
    marginLeft: 10,
    color: '#C9E5D2',
    fontSize: 19,
    fontWeight: '600',
  },
  resultCard: {
    borderRadius: 23,
    backgroundColor: '#24352C',
    paddingHorizontal: 21,
    paddingVertical: 20,
    marginTop: 17,
  },
  resultCardReady: {
    backgroundColor: '#285B43',
  },
  resultTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: '#C3CEC6',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  resultDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#87958B',
  },
  resultDotReady: {
    backgroundColor: '#D5EDDA',
  },
  resultValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
  },
  resultValue: {
    color: '#F7FAF6',
    fontSize: 56,
    lineHeight: 66,
    fontWeight: '600',
    letterSpacing: -2,
  },
  resultValueReady: {
    color: '#FFFFFF',
  },
  resultUnit: {
    marginLeft: 9,
    color: '#B9C9BE',
    fontSize: 20,
    fontWeight: '600',
  },
  resultUnitReady: {
    color: '#E0EEE4',
  },
  resultNote: {
    marginTop: 2,
    color: '#C3CEC6',
    fontSize: 12,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 3,
  },
  tipIcon: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E4ECE4',
    marginRight: 9,
  },
  tipIconText: {
    color: '#4C7058',
    fontSize: 12,
    fontWeight: '800',
  },
  tipText: {
    flex: 1,
    color: '#748078',
    fontSize: 12,
    lineHeight: 18,
  },
  tipStrong: {
    color: '#41564A',
    fontWeight: '700',
  },
});
