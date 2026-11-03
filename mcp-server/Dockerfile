FROM python:3.11-slim

# --- pip 网络层加固：国内镜像 + 超时/重试 ---
# PIP_INDEX_URL 可在构建时通过 --build-arg PIP_INDEX_URL=... 覆盖
ARG PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
ENV PIP_INDEX_URL=${PIP_INDEX_URL}
ENV PIP_TRUSTED_HOST=pypi.tuna.tsinghua.edu.cn
ENV PIP_DEFAULT_TIMEOUT=120
ENV PIP_RETRIES=5

WORKDIR /app
COPY requirements.txt .
COPY . .

# 合并两次 pip install：依赖 + 本包 editable 一次性完成，
# 避免 build-system 依赖（setuptools_scm 等）重复下载
RUN pip install --no-cache-dir -r requirements.txt -e .

ENV MCP_HOST=0.0.0.0
ENV MCP_PORT=8000
ENV WEKNORA_BASE_URL=http://app:8080/api/v1
# Set MCP_SERVER_AUTH_TOKEN at runtime; HTTP transport refuses to start without it.

EXPOSE 8000

CMD ["weknora-mcp-server", "--transport", "http", "--host", "0.0.0.0", "--port", "8000"]
