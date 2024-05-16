import csv
import json
from datetime import datetime

def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        for row in csv_reader:
            # Converter campos para tipos desejados
            row['idcontrato'] = int(row['idcontrato'])
            row['precoContratual'] = float(row['precoContratual'].replace(',', '.'))  # Converter vírgula para ponto e converter para float
            row['prazoExecucao'] = int(row['prazoExecucao'])
            row['NIPC_entidade_comunicante'] = int(row['NIPC_entidade_comunicante'])
            row['dataPublicacao'] = datetime.strptime(row['dataPublicacao'], '%d/%m/%Y').strftime('%Y-%m-%d')
            row['dataCelebracaoContrato'] = datetime.strptime(row['dataCelebracaoContrato'], '%d/%m/%Y').strftime('%Y-%m-%d')
            row.pop('nAnuncio', None)
            data.append(row)
    
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

# Substitua 'caminho_para_seu_csv.csv' pelo caminho do seu arquivo CSV e 'caminho_para_o_novo_json.json' pelo caminho onde deseja salvar o novo arquivo JSON
csv_to_json('contratos2024.csv', 'contratosV3.json')