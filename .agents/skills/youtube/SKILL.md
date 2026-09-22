---
name: youtube
description: Saca la transcripción y la ficha (título, canal, duración, fecha, descripción, capítulos) de un vídeo de YouTube, sin clave ni alta. Usar cuando David mande un enlace de YouTube como referencia o como material, o diga "mira este vídeo", "resume este vídeo", "qué dice este vídeo".
---

# YouTube

Versión mínima escrita en este proyecto: la skill `youtube` del método `diseno` es propia del
otro David y no venía en el paquete. Hace lo mismo que pide el método: transcripción y ficha de
un vídeo, para leerlos en lugar de verlos. Necesita `yt-dlp` (en este Mac: `brew install yt-dlp`,
ya instalado).

## Pasos

Trabajar siempre en el directorio temporal de la sesión, nunca dentro del proyecto.

**1 · La ficha**

```bash
yt-dlp -J --skip-download "<URL>" > ficha.json
python3 -c "import json;d=json.load(open('ficha.json'));print(d['title']);print(d.get('channel'));print(d.get('duration_string'));print(d.get('upload_date'));print([c['title'] for c in d.get('chapters') or []]);print(d.get('description','')[:1500])"
```

**2 · La transcripción** (subtítulos del autor si existen; si no, los automáticos)

```bash
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "es,es-ES,es-419,en,en-US,en-GB,ca,.*-orig" \
  --sub-format vtt -o "video" "<URL>"
```

Limpiar el VTT a texto corrido, sin marcas de tiempo ni líneas repetidas:

```bash
python3 - <<'PY'
import re, glob
f = sorted(glob.glob('video*.vtt'))[0]
out, last = [], None
for line in open(f, encoding='utf-8'):
    line = re.sub(r'<[^>]+>', '', line).strip()
    if not line or '-->' in line or line.startswith(('WEBVTT', 'Kind:', 'Language:')) or line.isdigit():
        continue
    if line != last:
        out.append(line)
    last = line
open('transcripcion.txt', 'w', encoding='utf-8').write(' '.join(out))
print(f, len(out), 'líneas')
PY
```

**3 · Lo que se entrega**

- La ficha en cinco líneas: título, canal, duración, fecha y de qué va.
- Lo que interesa para el encargo, con la marca de tiempo aproximada cuando importe.
- Si no hay subtítulos de ningún tipo, decirlo: no se inventa el contenido del vídeo.

## Límites

- Subtítulos automáticos: pueden traer errores en nombres propios; se señalan con `(?)`.
- Vídeos privados, con restricción de edad o de región pueden fallar; se dice y no se insiste.
