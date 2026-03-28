#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir encoding UTF-8 quebrado nos arquivos do projeto
Converte caracteres mal codificados de volta para UTF-8 correto
"""

import os
import re
from pathlib import Path

# Mapeamento de caracteres corrompidos para corretos
REPLACEMENTS = {
    'Ã©': 'é',
    'Ã§': 'ç',
    'Ã£': 'ã',
    'Ãµ': 'õ',
    'Ã¡': 'á',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã¢': 'â',
    'Ãª': 'ê',
    'Ã´': 'ô',
    'Ã€': 'À',
    'Ã‰': 'É',
    'Ãš': 'Ú',
    'Ã"': 'Ó',
    'Ã­cio': 'ício',
    'Ã¡gina': 'ágina',
    'episÃ³dio': 'episódio',
    'EpisÃ³dio': 'Episódio',
    'nÃ£o': 'não',
    'NÃ£o': 'Não',
    'ComentÃ¡rio': 'Comentário',
    'comentÃ¡rio': 'comentário',
    'funÃ§Ã£o': 'função',
    'FunÃ§Ã£o': 'Função',
    'InÃ­cio': 'Início',
    'Ãºltimo': 'último',
    'Ãºltimos': 'últimos',
    'histÃ³ria': 'história',
    'GÃªnero': 'Gênero',
    'gÃªnero': 'gênero',
    'sinopse': 'sinopse',
    'LanÃ§amento': 'Lançamento',
    'lanÃ§amento': 'lançamento',
    'EstÃºdio': 'Estúdio',
    'estÃºdio': 'estúdio',
    'VÃ­deo': 'Vídeo',
    'vÃ­deo': 'vídeo',
    'Ãudio': 'Áudio',
    'Ã¡udio': 'áudio',
    'ResoluÃ§Ã£o': 'Resolução',
    'resoluÃ§Ã£o': 'resolução',
    'AdicionÃ¡': 'Adicioná',
    'PrÃ³ximo': 'Próximo',
    'nÃºmero': 'número',
    'cÃ³digo': 'código',
    'âœ…': '✅',
    'â„¹ï¸': 'ℹ️',
    'ðŸ"´': '🔴',
    'ðŸ"—': '🔗',
    'ðŸ"±': '📱',
    "ðŸ'¡": '💡',
    'ðŸš€': '🚀',
    'ðŸ§¹': '🧹',
    'ðŸŽ‰': '🎉',
    'ðŸŒ': '🌐',
    'ðŸ"¡': '📡',
    'ðŸ"„': '🔄',
}

def fix_file_encoding(file_path):
    """
    Corrige encoding de um arquivo específico
    """
    try:
        # Lê o arquivo
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Aplica todas as substituições
        original_content = content
        for wrong, correct in REPLACEMENTS.items():
            content = content.replace(wrong, correct)
        
        # Salva apenas se houve mudanças
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Corrigido: {file_path}")
            return True
        else:
            print(f"⏭️  Sem mudanças: {file_path}")
            return False
            
    except Exception as e:
        print(f"❌ Erro em {file_path}: {e}")
        return False

def fix_directory(directory='.'):
    """
    Corrige todos os arquivos .js, .html, .css em um diretório
    """
    extensions = ['.js', '.html', '.css', '.md']
    fixed_count = 0
    total_count = 0
    
    for ext in extensions:
        for file_path in Path(directory).rglob(f'*{ext}'):
            # Ignora node_modules, .git, etc
            if any(part.startswith('.') or part == 'node_modules' for part in file_path.parts):
                continue
                
            total_count += 1
            if fix_file_encoding(file_path):
                fixed_count += 1
    
    print(f"\n📊 Resumo:")
    print(f"Total de arquivos processados: {total_count}")
    print(f"Arquivos corrigidos: {fixed_count}")
    print(f"Arquivos sem mudanças: {total_count - fixed_count}")

if __name__ == '__main__':
    print("🔧 Iniciando correção de encoding UTF-8...\n")
    fix_directory()
    print("\n✅ Processo concluído!")