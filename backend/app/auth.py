from fastapi import Request, HTTPException
from authlib.jose import jwt
import requests
import os

CLERK_ISSUER = os.getenv("CLERK_ISSUER")
JWKS_URL = os.getenv("JWKS_URL")
AUDIENCE = os.getenv("AUDIENCE")


def verify_token(token: str):
   
    jwks = requests.get(JWKS_URL).json()  # Fetch JWK Set
    claims_options = {
        "iss": {
            "essential": True,
            "values": [CLERK_ISSUER]
        },
        "aud": {
            "essential": True,
            "values": [AUDIENCE]
        }
    }
    claims = jwt.decode(token, jwks, claims_options=claims_options)  # Decode JWT and validate claims
    return claims

async def get_current_user(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth.replace("Bearer ", "")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        claims = verify_token(token)
    except Exception as e:
        print("Token verification error:", e)
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return claims['sub']  # Return the user ID from the token payload
