const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('calcula média base quando a3 não é informada', () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(6.2);
  });
  test('lança erro se a1 ou a2 forem undefined', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(5, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });
  
  test('lança erro se a1 ou a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(5, -1)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });
  
  test('lança erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(5, 7, -1)).toThrow('Nota a3 não pode ser negativa');
  });
  test('calcula média usando a melhor combinação entre a1 e a3 quando esta é maior', () => {
    expect(calcularMediaAluno(7, 5, 8)).toBeCloseTo(7.6);
  });
  
  test('calcula média usando a melhor combinação entre a3 e a2 quando esta é maior', () => {
    expect(calcularMediaAluno(4, 9, 8)).toBeCloseTo(8.6);
  });
  