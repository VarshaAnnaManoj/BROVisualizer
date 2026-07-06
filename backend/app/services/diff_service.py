from app.schemas.response_schema import DiffResponse
from app.utils.json_diff import build_json_diff


class DiffService:
    def generate_diff(self, input_json: dict, output_json: dict) -> DiffResponse:
        diff_payload = build_json_diff(input_json, output_json)
        return DiffResponse(
            added=diff_payload["added"],
            modified=diff_payload["modified"],
            deleted=diff_payload["deleted"],
            missing_nodes=diff_payload.get("missing_nodes", []),
        )
