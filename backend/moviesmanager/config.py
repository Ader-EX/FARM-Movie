import os
from typing import Dict
import yaml

DEFAULT_CONFIG_PATH = "./config.yaml"

def run_once(f):
    def helper(*args, **kwargs):
        if not helper.has_run:
            helper.has_run = True
            helper.data = f(*args, **kwargs)
        return helper.data
    helper.has_run = False
    return helper


@run_once
def get_config() -> Dict[str,str]:
    path = os.getenv("MM_CONFIG_PATH", DEFAULT_CONFIG_PATH)
    print("path " + path)     
    try:
        with open(path, "r") as file:
            config = yaml.safe_load(file)
            
    except FileNotFoundError:
        raise FileNotFoundError(f"Configuration file not found at {path}")
    return config